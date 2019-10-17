import Result, { Status } from './result';
import Suite from './suite';

/**
 * @class
 * @param {String} description
 * @param {boolean} skip
 */
export default class Runnable {
  public description: string;
  public result: Result;
  public skip: boolean;
  public parent: Suite | undefined;

  constructor(description: string, skip = false) {
    this.description = description;
    this.result = new Result();
    this.skip = skip;
  }

  /**
   * @description Run a `Runnable` instance.
   * @public
   * @return {Result}
   */
  public run(): Result {
    this.result.status = Status.Skipped; // Should be implemented in children
    return this.result;
  }

  /**
   * @description Run asynchronous `Runnable` instance.
   * @public
   * @return {Promise}
   */
  public async asyncRun(): Promise<Result> {
    return this.run();
  }

  /**
   * @description Check that `Runnable` run has completed and `Result` status is not 'Pending'
   * @public
   * @return {boolean}
   */
  public isDone() {
    return this.result.isDone();
  }

  /**
   * @description return a concatenated description of the current `Runnable` and it's `parent`
   * @public
   * @return {string}
   */
  public getFullDescription(): string {
    if (this.parent) {
      return this.parent.getFullDescription() + ' ' + this.description;
    }
    return this.description;
  }
}
