import Runnable from './runnable';

export default class Suite extends Runnable {
  public children: Runnable[];
  public root: Suite | undefined;
  public total: number;

  constructor(description: string, fn: () => any, skip = false, type = 'Suite') {
    super(description, fn);
    this.children = [];
    this.total = 0;
    this.type = type;
  }

  public addChild(child: Runnable) {
    this.root = this;
    this.children.push(child);
  }

  public getFullDesc(): string {
    if (this.root) {
      return this.root.getFullDesc() + ' ' + this.description;
    }
    return this.description;
  }
}
