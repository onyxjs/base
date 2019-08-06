import Runnable from './runnable';

export default class Suite extends Runnable {
  public type: string;

  constructor(description: string, fn: () => any, skip = false) {
    super(description, fn);
    this.type = 'Suite';
  }
}
