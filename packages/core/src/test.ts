import Runnable from './runnable';

export default class Test extends Runnable {

  constructor(description: string, fn: () => any, skip = false) {
    super(description, fn, skip);
    this.type = 'Test';
  }
}
