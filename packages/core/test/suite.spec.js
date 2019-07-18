import Suite from '../src/suite';
import Test from '../src/test';
import SuiteResult from '../src/suiteResult';

describe('Suite', () => {
  const sum = (a, b) => a + b;
  const test = new Test('description', () => sum(1, 2));
  const suite = new Suite('suite', test);

  it('should return a suite result', () => {
    expect(suite).toBeInstanceOf(Suite);
    expect(typeof suite.description).toBe('string');
    expect(suite.fn).toBeInstanceOf(Test);
    expect(suite.run()).toBeInstanceOf(SuiteResult);
  });
});
