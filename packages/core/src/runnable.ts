import { EventEmitter } from 'events';
import { performance } from 'perf_hooks';
import Result, { Status } from './result';
import { RunOptions } from './runner';
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

export interface RunnableOptions {
  skip: boolean;
  todo: boolean;
}

/**
 * @class
 * @param {String} description
 * @param {boolean} skip
 */
export default class Runnable extends EventEmitter {

  public static normalizeOptions(options: Partial<RunnableOptions>): RunnableOptions {
    return {
      skip: false,
      todo: false,
      ...options,
    };
  }
  public description: string;
  public result: Result;
  public options: RunnableOptions;
  public parent: Suite | null;
  public type: RunnableTypes = RunnableTypes.Runnable;
  public [runnableSymbol] = true;

  public time: number = 0;
  private start: number = 0;

  /* istanbul ignore next */
  constructor(description: string, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super();
    this.description = description;
    this.result = new Result();
    this.options = Runnable.normalizeOptions(options);
    this.parent = parent;
  }

  public doStart(): void {
    this.result.status = Status.Running;
    this.emit('start', this);
    this.start = performance.now();
  }

  public doEnd(): void {
    if (this.result.status !== Status.Skipped && this.result.status !== Status.Todo) {
      this.time = performance.now() - this.start;
    }
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
   * @description Run `Runnable` instance.
   * @public
   * @return {Promise}
   */
  // istanbul ignore next unimplemented
  public async run(options?: Partial<RunOptions>): Promise<Result> {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo);
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
