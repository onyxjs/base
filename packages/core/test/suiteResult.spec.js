import SuiteResult from '../src/suiteResult';

describe('Suite result', () => {
  const result = new SuiteResult('error', ['error message']);

  it('should return a test result', () => {
    expect(result).toBeInstanceOf(SuiteResult);
    expect(typeof result.status).toBe('string');
    expect(result.messages).toBeInstanceOf(Array);
  });
});
