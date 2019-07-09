import mock from '../src/mock';

describe('Mock function', () => {
  it('should create a mocking function', () => {
    const fn = (a, b) => a + b;
    const mockFn = mock(fn);

    expect(mockFn.calls).toEqual([]);
    expect(mockFn(1, 2)).toBe(3);
    expect(mockFn.calls).toEqual([[1, 2]]);
  });
});
