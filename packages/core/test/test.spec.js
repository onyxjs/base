import Test from '../src/test.js';
import TestResult from '../src/testResult.js';

describe('test', () => {
  const test = new Test();

  test.description = 'example description';

  it('should return a valid test', () => {
    expect(test).toBeInstanceOf(Test);
    expect(typeof test.description).toBe('string');
    expect(test.description).toBe('example description');
    expect(test.fn).toBe(null);
    expect(test.run()).toBeInstanceOf(TestResult);
  });
});
