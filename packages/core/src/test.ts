import ExpectError from '../../matchers/src';
import Result, { Status } from './result';
import Runnable from './runnable';

export default class Test extends Runnable {
  public fn: () => void;

  constructor(description: string, fn: () => void, skip = false) {
    super(description, skip);
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
      if (error instanceof ExpectError) {
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
