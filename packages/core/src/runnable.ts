import Result from './result';

/**
 * @class
 * @param {String} description
 * @param {Function} fn
 */

export default class Runnable {
  public description: string;
  public fn: () => Result | Result;
  public pending: boolean;

  constructor(description: string, fn: () => Result | Result) {
    this.description = description;
    this.fn = fn;
    this.pending = false;
  }

  /**
   * Run a `Runnable` instance return `Runnable` status:
   * @public
   * @param {Function} fn
   * @return {Result}
   */
  public run(fn: any): Result {
    // run runnable instance
    try {
      fn();
    } catch (error) {
      return new Result('Failed', error);
    }
  }
}
