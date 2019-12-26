import Result, { Status } from './result';
import Runnable, { isRunnable, RunnableTypes } from './runnable';
import Suite from './suite';

export const isTest = (v: unknown): v is Test => {
  if (!isRunnable(v)) { return false; }
  return v.type === RunnableTypes.Test;
};

export default class Test extends Runnable {
  public fn: () => void;
  public type = RunnableTypes.Test;

  constructor(description: string, fn: () => void, skip?: boolean, parent?: Suite) {
    super(description, skip || false, parent);
    this.fn = fn;
  }

  /**
   * Run a `Test` instance return `Runnable` status:
   * @public
   * @return {Result}
   */
  public run(): Result {
    if (this.skip) {
      this.result.status = Status.Skipped;
      return this.result;
    }

    try {
      this.fn();
    } catch (error) {
      if (error.name === 'ExpectError') {
        this.result.addMessages(String(error));
        this.result.status = Status.Failed;
      } else {
        this.result.addMessages(String(error));
        this.result.status = Status.Errored;
      }
      return this.result;
    }

    this.result.status = Status.Passed;
    return this.result;
  }
}
