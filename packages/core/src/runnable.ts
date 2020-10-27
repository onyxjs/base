import { EventEmitter } from 'events';
import { performance } from 'perf_hooks';
import Result, { Status } from './result';
import { RunOptions } from './runner';
import Suite from './suite';
import Test from './test';
import { OnyxEvent, OnyxEvents } from './types';

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

  public _emit(event: OnyxEvent, runnable: Runnable | Test | Suite, error?: Error | string, todo?: boolean) {
    if (this.parent) {
      this.parent._emit(event, runnable, error, todo);
    } else {
      this.emit(event, runnable, error, todo);
    }
  }

  /**
   * @description Sets result status to `Running` and _emits a `start` event with the `Runnable` instance and timestamp.
   */
  public doStart(): void {
    this.result.status = Status.Running;
    this.start = performance.now();
    this._emit(OnyxEvents.Start, this);
  }

  /**
   * @description _emits an `end` event with the completed `Runnable` instance and the time taken to complete.
   */
  public doEnd() {
    if (this.result.status !== Status.Skipped && this.result.status !== Status.Todo) {
      this.time = performance.now() - this.start;
    }

    this._emit(OnyxEvents.End, this);
  }

  /**
   * @description _emits a `pass` event with the passing `Runnable` instance.
   */
  public doPass(): Result {
    this.result.status = Status.Passed;
    this._emit(OnyxEvents.Pass, this);

    this.doEnd();
    return this.result;
  }

  /**
   * @description _emits a `fail` event with the failed `Runnable` instance and passed error.
   */
  public doFail(error?: Error | string): Result {
    if (error) {
      this.result.addMessages(String(error));
    }
    this.result.status = Status.Failed;
    this._emit(OnyxEvents.Fail, this, error);

    this.doEnd();

    return this.result;
  }

  /**
   * @description _emits `skip` event with the skipped `Runnable` instance.
   */
  public doSkip(todo: boolean = false): Result {
    this.result.status = todo ? Status.Todo : Status.Skipped;

    this._emit(OnyxEvents.Skip, this, undefined, todo);
    this.doEnd();

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

  /**
   * @description Run a `Runnable` instance.
   */
  // istanbul ignore next unimplemented
  public async run(options?: Partial<RunOptions>): Promise<Result> {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo);
    }

    this.doStart();

    return this.doSkip(); // To be replaced with real run function
  }
}
