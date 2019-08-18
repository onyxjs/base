import Result, { Status } from './result';
import Runnable from './runnable';

export default class Suite extends Runnable {
  public children: Runnable[];

  constructor(description: string, skip = false) {
    super(description, skip);
    this.children = [];
  }

  public addChild(child: Runnable) {
    child.parent = this;
    this.children.push(child);
  }

  public getFullDesc(): string {
    if (this.parent) {
      return this.parent.getFullDesc() + ' ' + this.description;
    }
    return this.description;
  }

  /**
   * Run a `Suite` instance return `Runnable` status:
   * @public
   * @return {Result}
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
