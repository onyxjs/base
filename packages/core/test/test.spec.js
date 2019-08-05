import Test from '../src/test.js';
import TestResult from '../src/testResult.js';

describe('test', () => {
  const sum = (a, b) => a + b;

  const test = new Test('example description', sum(1, 2));

  it('should return a valid test', () => {
    expect(test).toBeInstanceOf(Test);
    expect(typeof test.description).toBe('string');
    expect(test.fn).toBe(3);
    expect(test.run()).toBeInstanceOf(TestResult);
  });
});
