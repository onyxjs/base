import Result from './result';

/**
 * @class
 * @param {String} description
 * @param {Function} fn
 */

export default class Runnable {
  public description: string;
  public fn: () => any;
  public pending: boolean;
  public async: boolean | number;
  public sync: boolean;

  constructor(description: string, fn: () => Result | Result) {
    this.description = description;
    this.fn = fn;
    this.pending = false;
    this.async = fn && fn.length;
    this.sync = !this.async;
  }

  /**
   * Run a `Runnable` instance return `Runnable` status:
   * @public
   * @param {Function} fn
   * @return {Result}
   */
  public run(fn: () => any | any[]): Result {
    try {
      fn();
    } catch (error) {
      return new Result('Failed', error);
    }

    return new Result('Success', [`passing test`]);
  }

  /**
   * Run asynchronous `Test` or `Suite`:
   * @public
   * @param {Function} fn 
   * @return {Result}
   */
  public async asyncRun(fn: any[]): Promise<Result> {
    return await this.run(this.fn);
  }
}
