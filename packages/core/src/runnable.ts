import Result, { Status } from './result';
import Suite from './suite'

/**
 * @class
 * @param {String} description
 * @param {Function} fn
 */

export default class Runnable {
  public description: string;
  public fn: () => any;
  public result: Result;
  public skip: boolean;
  public status: string;
  public parent: Suite | undefined;

  constructor(description: string, fn: () => any, skip = false) {
    this.description = description;
    this.fn = fn;
    this.result = new Result();
    this.skip = skip;
    this.status = 'pending';
  }

  /**
   * Run a `Runnable` instance return `Runnable` status:
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
    }

    this.result.status = Status.Passed; // Will be cancelled if status is already set in catch

    return this.result;
  }

  /**
   * Run asynchronous `Test` or `Suite`:
   * @public
   * @return {Promise}
   */
  public async asyncRun(): Promise<Result> {
    return await this.run();
  }

  /**
   * Check if `Runnable` is done
   * @return {boolean}
   */
  public isDone() {
    return this.result.isDone();
  }
}
