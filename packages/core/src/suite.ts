import { HookName, Hooks } from './hooks';
import Result, { Status } from './result';
import Runnable, { isRunnable, RunnableOptions, RunnableTypes } from './runnable';
import { normalizeRunOptions, RunOptions } from './runner';

export const isSuite = (v: unknown): v is Suite => {
  if (!isRunnable(v)) { return false; }
  return v.type === RunnableTypes.Suite;
};
export const rootSymbol = Symbol('isRoot');

export interface Stats {
  total: number;
  pending: number;
  running: number;
  done: number;
  passed: number;
  failed: number;
  skipped: number;
  todo: number;
  time: number;
}

export class BailError extends Error {
  constructor(message: string) {
    super(message) /* istanbul ignore next */;
    this.name = 'BailError';
  }
}

/* tslint:disable:max-classes-per-file */
export default class Suite extends Runnable {
  public children: Runnable[];
  public [rootSymbol]?: boolean;
  public type = RunnableTypes.Suite;
  public options: RunnableOptions;
  public hooks: Hooks;
  private failed: number;

  /* istanbul ignore next */
  constructor(description: string, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super(description, options, parent);
    this.options = {
      ...Runnable.normalizeOptions(options),
    };
    this.children = [];
    this.failed = 0;

    this.hooks = {
      afterAll: [],
      afterEach: [],
      beforeAll: [],
      beforeEach: [],
    };
  }

  public async invokeAsyncHook(name: HookName) {
    const hook = this.hooks[name];
    for (const fn of hook) {
      try {
        await fn();
      } catch (err) {
        console.error(`Error in ${name} hook: ${err}`);
      }
    }
  }

  /**
   * @description Add one or more `Runnable` instances to the `children` array.
   * @param {Runnable[]} ...children
   * @returns {Void}
   */
  public addChildren(...children: Runnable[]): void {
    for (const child of children) {
      child.parent = this;
    }
    this.children.push(...children);
  }

  /**
   * @description Check that `Suite` is the root suite
   * @public
   * @return {boolean}
   */
  public isRoot(): boolean {
    return Boolean(this[rootSymbol]);
  }

  /**
   * @description Runs a `Suite` instance asynchronously returning a `Result`:
   * @public
   * @param {Partial<RunOptions>} options
   * @returns {Promise<Result>}
   */
  public async run(options?: Partial<RunOptions>): Promise<Result> {
    options = normalizeRunOptions(options);

    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo);
    }

    this.doStart();
    await this.invokeAsyncHook('beforeAll');

    const promises: Array<Promise<void>> = [];
    for (const child of this.children) {
      promises.push((async () => {
          await this.invokeAsyncHook('beforeEach');
          const result = await child.run(options);
          this.result.addMessages(...result.messages.map((m) => `${child.description}: ${m}`));
          await this.invokeAsyncHook('afterEach');

          if (result.status === Status.Failed) {
            ++this.failed;
          }
      })());
    }

    if (options.sequential) {
      for (const promise of promises) {
        try {
          await promise;

          if (options.bail) {
            if (typeof options.bail === 'number' && this.failed >= options.bail) {
              throw new BailError('bailed');
            } else if (options.bail === true && this.failed >= 1) {
              throw new BailError('bailed');
            }
          }
        } catch (error) {
          await this.invokeAsyncHook('afterAll');
          return this.doFail(error);
        }
      }
    } else {
      try {
        await Promise.all(promises.map(async (p) => {
          await p;

          if (options && options.bail) {
            if (typeof options.bail === 'number' && this.failed >= options.bail) {
              throw new BailError('bailed');
            } else if (options.bail === true && this.failed >= 1) {
              throw new BailError('bailed');
            }
          }
        }));
      } catch (error) {
        await this.invokeAsyncHook('afterAll');
        return this.doFail(error);
      }
    }

    await this.invokeAsyncHook('afterAll');
    if (this.failed) {
      return this.doFail();
    }
    return this.doPass();
  }

  /**
   * @description Returns `Suite` stats in a `Stats` object
   * @public
   * @returns {Stats}
   */
  public getStats(): Stats {
    const childrenList = this.flatten(this.children);
    return {
      done: childrenList.filter((c) => c.result.isDone()).length,
      failed: childrenList.filter((c) => c.result.status === Status.Failed).length,
      passed: childrenList.filter((c) => c.result.status === Status.Passed).length,
      pending: childrenList.filter((c) => c.result.status === Status.Pending).length,
      running: childrenList.filter((c) => c.result.status === Status.Running).length,
      skipped: childrenList.filter((c) => c.result.status === Status.Skipped).length,
      time: this.time,
      todo: childrenList.filter((c) => c.result.status === Status.Todo).length,
      total: childrenList.length,
    };
  }

  private flatten(array: Runnable[]): Runnable[] {
    const flatTree: Runnable[] = [];
    for (const child of array) {
      if (isSuite(child)) {
        flatTree.push(...this.flatten(child.children));
        continue;
      }
      flatTree.push(child);
    }

    return flatTree;
  }
}
