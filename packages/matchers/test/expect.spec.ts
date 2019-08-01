import _expect from '../src/index';

describe('Expect', () => {
  it('should expect values', () => {
    expect(() => _expect(1).toBe(1)).not.toThrow();
    expect(() => _expect(1).toBe(2)).toThrow();
  });

  it('should not expect values', () => {
    expect(() => _expect(1).not.toBe(1)).toThrow();
    expect(() => _expect(1).not.toBe(2)).not.toThrow();
  });
});
