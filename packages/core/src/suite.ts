import Runnable from './runnable';

export default class Suite extends Runnable {
  public children: Runnable[];

  constructor(description: string, fn: () => any, skip = false) {
    super(description, fn, skip);
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
}
