import Runnable from './runnable';

export default class Test extends Runnable {
  public description: string;
  public fn: () => any;
  public type: string;

  constructor(description: string, fn: () => any) {
    super(description, fn);
    this.description = description;
    this.fn = fn;
    this.type = 'Test';
  }
}
