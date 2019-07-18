import TestResult from './testResult';

export default class Test {
  description = '';
  fn = null;

  constructor(description, fn) {
    this.description = description;
    this.fn = fn;
  }

  run() {
    try {
      this.fn();
    } catch (e) {
      return new TestResult('error', [ e ]);
    }
    return new TestResult('success', [ 'Success' ]);
  }

  asyncRun(...args) {
    return this.run(...args);
  }
};
