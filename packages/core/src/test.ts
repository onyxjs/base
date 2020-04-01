import Result from './result';
import Runnable, { isRunnable, RunnableOptions, RunnableTypes } from './runnable';
import { RunOptions } from './runner';
import Suite from './suite';

export type testFn = () => void | Promise<any>;

export const isTest = (v: unknown): v is Test => {
  if (!isRunnable(v)) { return false; }
  return v.type === RunnableTypes.Test;
};

export default class Test extends Runnable {
  public fn: testFn;
  public type = RunnableTypes.Test;

  constructor(description: string, fn: testFn, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super(description, options, parent);
    this.fn = fn;
    this.parent = parent;
  }

  /**
   * Run a `Test` instance asynchronously return `Runnable` status:
   * @public
   * @return {Promise<Result>}
   */
  public async asyncRun(options?: Partial<RunOptions>): Promise<Result> {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo);
    }

    this.doStart();

    if (options && options.timeout) {
      let timeoutID: NodeJS.Timeout;
      const test = new Promise(async (resolve, reject) => {
        timeoutID = setTimeout(() => {
          reject(`Test has timed out: ${options.timeout}ms`);
        }, options.timeout!);

        try {
          await this.fn();
        } catch (error) {
          clearTimeout(timeoutID);
          reject(error);
        }

        clearTimeout(timeoutID);
        resolve();
      });

      try {
        await test;
      } catch (error) {
        return this.doFail(error);
      }

      return this.doPass();
    } else {
      try {
        this.fn();
      } catch (error) {
        return this.doFail(error);
      }

      return this.doPass();
    }
  }
}
