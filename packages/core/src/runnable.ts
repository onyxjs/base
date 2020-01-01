import { EventEmitter } from 'events';
import { performance } from 'perf_hooks';
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
  public todo: boolean;
  public parent: Suite | null;
  public type: RunnableTypes = RunnableTypes.Runnable;
  public [runnableSymbol] = true;

  public time: number = 0;
  private start: number = 0;

  constructor(description: string, skip?: boolean, todo?: boolean, parent?: Suite | null) {
    super();
    this.description = description;
    this.result = new Result();
    this.skip = skip || false;
    this.todo = todo || false;
    this.parent = parent || null;
  }

  public doStart(): void {
    this.result.status = Status.Running;
    this.emit('start', this);
    this.start = performance.now();
  }

  public doEnd(): void {
    this.time = performance.now() - this.start;
    this.emit('end', this, this.time);
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

  public doSkip(todo: boolean = false): Result {
    this.result.status = todo ? Status.Todo : Status.Skipped;
    this.emit('skip', this, todo);
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
    if (this.skip || this.todo) {
      return this.doSkip(this.todo);
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
    if (this.skip || this.todo) {
      return this.doSkip(this.todo);
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
