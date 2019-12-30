import Result, { Status } from './result';
import Runnable, { isRunnable, RunnableTypes } from './runnable';

export const isSuite = (v: unknown): v is Suite => {
  if (!isRunnable(v)) { return false; }
  return v.type === RunnableTypes.Suite;
};
export const rootSymbol = Symbol('isRoot');

export interface SuiteState {
  total: number;
  pending: number;
  done: number;
  passed: number;
  failed: number;
  skipped: number; // TODO: add TODO state
}

export default class Suite extends Runnable {
  public children: Runnable[];
  public [rootSymbol]?: boolean;
  public type = RunnableTypes.Suite;

  constructor(description: string, skip?: boolean, parent?: Suite) {
    super(description, skip || false, parent);
    this.children = [];
  }

  /**
   * @description Add a `Runnable` to the `children` array.
   * @param {Runnable} child
   * @returns {Void}
   */
  public addChild(child: Runnable): void {
    child.parent = this;
    this.children.push(child);
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
   * @description Runs a `Suite` instance returning a `Result`:
   * @public
   * @returns {Result}
   */
  public run(): Result {
    if (this.skip) {
      return this.doSkip();
    }

    this.doStart();

    for (const child of this.children) {
      const result = child.run();
      this.result.addMessages(...result.messages);
      if (result.status === Status.Failed) { // TODO: make bail optional
        return this.doFail();
      }
    }

    return this.doPass();
  }

  public filterChildrenByStatus(status: Status): Runnable[] {
    return this.children.filter((c) => c.result.status === status);
  }

  public getState(): SuiteState {
    return {
      done: this.children.filter((c) => c.result.isDone()).length,
      failed: this.filterChildrenByStatus(Status.Failed).length,
      passed: this.filterChildrenByStatus(Status.Passed).length,
      pending: this.filterChildrenByStatus(Status.Pending).length,
      skipped: this.filterChildrenByStatus(Status.Skipped).length,
      total: this.children.length,
    };
  }

  // TODO: real asyncRun using EventEmitters or Promise
}
