import { EventEmitter } from 'events';
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
export default class Runnable extends EventEmitter {
  public description: string;
  public result: Result;
  public skip: boolean;
  public parent: Suite | null;
  public type: RunnableTypes = RunnableTypes.Runnable;
  public [runnableSymbol] = true;

  constructor(description: string, skip?: boolean, parent?: Suite | null) {
    super();
    this.description = description;
    this.result = new Result();
    this.skip = skip || false;
    this.parent = parent || null;
  }

  public doStart(): void {
    this.result.status = Status.Running;
    this.emit('start', this);
  }

  public doEnd(): void {
    this.emit('end', this);
  }

  public doPass(): Result {
    this.result.status = Status.Passed;
    this.emit('pass', this);
    this.doEnd();

    return this.result;
  }

  public doFail(error?: Error | string): Result {
    if (error) {
      this.result.addMessages(String(error));
    }
    this.result.status = Status.Failed;
    this.emit('fail', this, error);
    this.doEnd();

    return this.result;
  }

  public doSkip(): Result { // TODO: add TODO tests support
    this.result.status = Status.Skipped;
    this.emit('skip', this);
    this.doEnd();

    return this.result;
  }

  /**
   * @description Run a `Runnable` instance.
   * @public
   * @return {Result}
   */
  // istanbul ignore next unimplemented
  public run(): Result {
    if (this.skip) {
      return this.doSkip();
    }

    this.doStart();

    return this.doSkip(); // To be replaced with real run function
  }

  /**
   * @description Run `Runnable` instance asynchronously.
   * @public
   * @return {Promise}
   */
  // istanbul ignore next unimplemented
  public async asyncRun(): Promise<Result> {
    if (this.skip) {
      return this.doSkip();
    }

    this.doStart();

    return this.doSkip(); // To be replaced with real run function
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
    if (this.parent && !this.parent.isRoot()) {
      return `${this.parent.getFullDescription()} -> ${this.description}`;
    }
    return this.description;
  }
}
