import Result from './result';
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
      return this.doSkip();
    }

    this.doStart();

    try {
      this.fn();
    } catch (error) {
      return this.doFail(error);
    }

    return this.doPass();
  }
}
