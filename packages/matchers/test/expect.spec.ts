import _expect from '../src/expect';

const matchers = {
  toStrictlyEqual: (a, b) => a === b,
};

describe('Expect', () => {
  it('should expect values', () => {
    expect(() => _expect(matchers, 1).toStrictlyEqual(1)).not.toThrow();
    expect(() => _expect(matchers, 1).toStrictlyEqual(2)).toThrow();
  });

  it('should not expect values', () => {
    expect(() => _expect(matchers, 1).not.toStrictlyEqual(1)).toThrow();
    expect(() => _expect(matchers, 1).not.toStrictlyEqual(2)).not.toThrow();
  });
});
