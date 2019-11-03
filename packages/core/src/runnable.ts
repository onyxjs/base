import Result, { Status } from './result';
import Suite from './suite';

export const runnableSymbol = Symbol('isRunnable');

export const isRunnable = (v: unknown): v is Runnable => {
  if (typeof v === 'object' && v === null) { return false; }
  return (v as Runnable)[runnableSymbol];
};

export enum RunnableTypes {
  Runnable = 'runnable',
  Suite = 'suite',
  Test = 'test',
}

/**
 * @class
 * @param {String} description
 * @param {boolean} skip
 */
export default class Runnable {
  public description: string;
  public result: Result;
  public skip: boolean;
  public parent: Suite | null;
  public type: RunnableTypes = RunnableTypes.Runnable;
  public [runnableSymbol] = true;

  constructor(description: string, skip?: boolean, parent?: Suite) {
    this.description = description;
    this.result = new Result();
    this.skip = skip || false;
    this.parent = parent || null;
  }

  /**
   * @description Run a `Runnable` instance.
   * @public
   * @return {Result}
   */
  // istanbul ignore next unimplemented
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
   * @description Get the `Runnable` type
   * @public
   * @return {RunnableTypes}
   */
  public getType() {
    return this.type;
  }

  /**
   * @description return a concatenated description of the current `Runnable` and it's `parent`
   * @public
   * @return {string}
   */
  public getFullDescription(): string {
    if (this.parent && !this.parent.isRoot()) {
      return `${this.parent.getFullDescription()} -> ${this.description}`;
    }
    return this.description;
  }
}
