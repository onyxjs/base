import Test from './test';
import SuiteResult from './suiteResult';

export default class Suite {
  description = '';
  fn = null;
  status = null;

  constructor(description, fn) {
    this.description = description;
    this.fn = fn;
    this.status = 'pending';
  }

  run() {
    try {
      this.fn();
    } catch (e) {
      
      this.status = new SuiteResult('error', [ e ]);
      return this.status;
    }
    
    this.status = new SuiteResult('success', [ 'Success' ]);
    return this.status;
  }

  asyncRun(...args) {
    return this.run(...args);
  }
};
