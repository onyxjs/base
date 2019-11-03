import Result, { Status } from './result';
import Runnable, { isRunnable, RunnableTypes } from './runnable';

export const isSuite = (v: unknown): v is Suite => {
  if (!isRunnable(v)) { return false; }
  return v.type === RunnableTypes.Suite;
};
export const rootSymbol = Symbol('isRoot');

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
  public addChild(child: Runnable) {
    child.parent = this;
    this.children.push(child);
  }

  /**
   * @description Check that `Suite` is the root suite
   * @public
   * @return {boolean}
   */
  public isRoot() {
    return Boolean(this[rootSymbol]);
  }

  /**
   * @description Runs a `Suite` instance returning a `Result`:
   * @public
   * @returns {Result}
   */
  public run(): Result {
    let newStatus = Status.Passed;
    for (const child of this.children) {
      const result = child.run();
      if (result.status === Status.Errored && newStatus === Status.Passed) { newStatus = Status.Errored; }
      if (result.status === Status.Failed && newStatus === Status.Passed) { newStatus = Status.Failed; }
      this.result.addMessages(...result.messages);
    }

    this.result.status = newStatus;
    return this.result;
  }
}
