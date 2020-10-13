import { EventEmitter } from 'events';
import { performance } from 'perf_hooks';
import Result, { Status } from './result';
import { RunOptions } from './runner';
import Suite from './suite';

export const runnableSymbol = Symbol('isRunnable');

/**
 * @description Checks if passed value is an instance of `Runnable`.
 */
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

export default class Runnable extends EventEmitter {

  /**
   * @description Normalize passed options object with `Runnable` default options.
   */
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

  /**
   * @description Sets result status to `Running` and emits a `start` event with the `Runnable` instance and timestamp.
   */
  public doStart(): void {
    this.result.status = Status.Running;
    if (this.parent) {
      this.parent.emit('start', this);
    } else {
      this.emit('start', this);
    }

    this.start = performance.now();
  }

  /**
   * @description Emits an `end` event with the completed `Runnable` instance and the time taken to complete.
   */
  public doEnd() {
    if (this.result.status !== Status.Skipped && this.result.status !== Status.Todo) {
      this.time = performance.now() - this.start;
    }

    if (this.parent) {
      this.parent.emit('end', this, this.time);
    } else {
      this.emit('end', this, this.time);
    }
  }

  /**
   * @description Emits a `pass` event with the passing `Runnable` instance.
   */
  public doPass(): Result {
    this.result.status = Status.Passed;
    if (this.parent) {
      this.parent.emit('pass', this);
    } else {
      this.emit('pass', this);
    }

    this.doEnd();
    return this.result;
  }

  /**
   * @description Emits a `fail` event with the failed `Runnable` instance and passed error.
   */
  public doFail(error?: Error | string): Result {
    if (error) {
      this.result.addMessages(String(error));
    }
    this.result.status = Status.Failed;
    if (this.parent) {
      this.parent.emit('fail', this, error);
      this.parent.doEnd();
    } else {
      this.emit('fail', this, error);
      this.doEnd();
    }

    return this.result;
  }

  /**
   * @description Emits `skip` event with the skipped `Runnable` instance.
   */
  public doSkip(todo: boolean = false): Result {
    this.result.status = todo ? Status.Todo : Status.Skipped;

    if (this.parent) {
      this.parent.emit('skip', this, todo);
      this.parent.doEnd();
    } else {
      this.emit('skip', this, todo);
      this.doEnd();
    }

    return this.result;
  }

  /**
   * @description Check that `Runnable` has completed.
   */
  public isDone() {
    return this.result.isDone();
  }

  /**
   * @description Concatenate the Parent's description and the current `Runnable`'s description.
   */
  public getFullDescription(): string {
    if (this.parent && !this.parent.isRoot()) {
      return `${this.parent.getFullDescription()} -> ${this.description}`;
    }
    return this.description;
  }
}
