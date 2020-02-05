import Result from './result';
import Runnable, { isRunnable, RunnableOptions, RunnableTypes } from './runnable';
import Suite from './suite';

export const isTest = (v: unknown): v is Test => {
  if (!isRunnable(v)) { return false; }
  return v.type === RunnableTypes.Test;
};

export default class Test extends Runnable {
  public fn: () => void;
  public type = RunnableTypes.Test;

  constructor(description: string, fn: () => void, options: Partial<RunnableOptions> = {}, parent: Suite) {
    super(description, options, parent);
    this.fn = fn;
    this.parent = parent || null;
  }

  /**
   * Run a `Test` instance return `Runnable` status:
   * @public
   * @return {Result}
   */
  public run(): Result {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo);
    }

    this.doStart();

    try {
      this.fn();
    } catch (error) {
      return this.doFail(error);
    }

    return this.doPass();
  }

  /**
   * Run a `Test` instance asynchronously return `Runnable` status:
   * @public
   * @return {Promise<Result>}
   */
  public async asyncRun(): Promise<Result> {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo);
    }

    this.doStart();

    try {
      this.fn();
    } catch (error) {
      this.doFail(error);
      throw error;
    }

    return this.doPass();
  }
}
