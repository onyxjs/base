import TestResult from '../src/testResult';

describe('Test result', () => {
  const result = new TestResult('error', ['error message']);

  it('should return a test result', () => {
    expect(result).toBeInstanceOf(TestResult);
    expect(typeof result.status).toBe('string');
    expect(result.messages).toBeInstanceOf(Array);
  });
});
