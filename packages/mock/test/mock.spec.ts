import mock, { isMock, mockSymbol } from '../src/mock';

describe('Mock function', () => {
  it('should create a mocking function', () => {
    const fn = (a: number, b: number) => a + b;
    const mockFn = mock(fn);

    expect(mockFn.calls).toEqual([]);
    expect(mockFn.returns).toEqual([]);
    expect(mockFn(1, 2)).toBe(3);
    expect(mockFn.calls).toEqual([[1, 2]]);
    expect(mockFn.returns).toEqual([3]);
  });

  it('should reset', () => {
    const fn = (a: number, b: number) => a + b;
    const mockFn = mock(fn);

    mockFn(1, 2);
    expect(mockFn.calls).toEqual([[1, 2]]);
    expect(mockFn.returns).toEqual([3]);
    mockFn.reset();
    expect(mockFn.calls).toEqual([]);
    expect(mockFn.returns).toEqual([]);
  });

  it('should work with callback', () => {
    const fn = (a: number, b: number) => a + b;
    const cb = jest.fn();
    const mockFn = mock(fn, cb);

    mockFn(1, 2);
    expect(cb).toHaveBeenCalledWith([1, 2], 3);
  });

  it('should check if mock', () => {
    const fn = (a: number, b: number) => a + b;
    const mockFn = mock(fn);

    expect(isMock(mockFn)).toBeTruthy();
    expect(isMock(fn)).toBeFalsy();
    expect(isMock(null)).toBeFalsy();
    expect(isMock({})).toBeFalsy();
    expect(
      isMock({
        [mockSymbol]: true,
      }),
    ).toBeFalsy();
  });

  it('should throw an error', () => {
    const mockErr = mock(() => {
      throw Error();
    });

    const fn = (a: any, b: number) => {
      if (typeof a !== typeof b) { throw Error(); }

      return a + b;
    };

    const mockFn = mock(fn);

    try {
      mockFn('string', 1);
    } catch {
      // no-op
    }

    expect(mockFn.errors).toHaveLength(1);
    expect(mockErr).toThrow();
  });
});
