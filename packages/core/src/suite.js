import Test from './test';

export default class Suite {
  status = '';
  tests = [];

  constructor(status, tests) {
    this.status = status;
    this.tests = tests;
  }

  run() {
    this.status = 'pending';

    this.tests.forEach(test => {
      if(test instanceof Test) {
        test.run();
      }
    });
  }

  asyncRun(...args) {
    return this.run(...args);
  }
};
