import TestResult from './testResult';

export default class Test {
  description = '';
  fn = null;

  constructor(...args) {
  }

  run() {
    try {
      fn();
    } catch (e) {
      return new TestResult('error', [ e ]);
    }
    return new TestResult();
  }

  async asyncRun(...args) {
    return run(...args);
  }
}
