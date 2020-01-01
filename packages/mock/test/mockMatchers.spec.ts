import $expect from '@onyx/matchers/src';
import mock from '../src/mock';
import '../src/mockMatchers';

describe('Mock function matchers', () => {
  it('toHaveBeenCalled', () => {
    expect(() => $expect({}).toHaveBeenCalled()).toThrow(TypeError);

    const mockFn = mock((a: any, b: any) => a + b);

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveBeenCalled()).not.toThrow();
  });

  it('toHaveBeenCalledTimes', () => {
    expect(() => $expect({}).toHaveBeenCalledTimes(1)).toThrow(TypeError);

    const mockFn = mock((a: any, b: any) => a + b);

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveBeenCalledTimes(1)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenCalledTimes(2)).toThrow();

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveBeenCalledTimes(1)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenCalledTimes(2)).not.toThrow();
  });

  it('toHaveBeenCalledWith', () => {
    expect(() => $expect({}).toHaveBeenCalledWith()).toThrow(TypeError);

    const mockFn = mock((a: any, b: any) => a + b);
    expect(() => $expect(mockFn).toHaveBeenCalledWith()).toThrow();

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveBeenCalledWith(1)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenCalledWith(1, 2)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenCalledWith(2)).toThrow();

    mockFn(3, 4);
    expect(() => $expect(mockFn).toHaveBeenCalledWith(1)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenCalledWith(1, 2)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenCalledWith(2)).toThrow();
  });

  it('toHaveBeenLastCalledWith', () => {
    expect(() => $expect({}).toHaveBeenLastCalledWith()).toThrow(TypeError);

    const mockFn = mock((a: any, b: any) => a + b);
    expect(() => $expect(mockFn).toHaveBeenLastCalledWith()).toThrow();

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveBeenLastCalledWith(1, 2)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenLastCalledWith(3, 4)).toThrow();

    mockFn(3, 4);
    expect(() => $expect(mockFn).toHaveBeenLastCalledWith(1, 2)).toThrow();
    expect(() => $expect(mockFn).toHaveBeenLastCalledWith(3)).not.toThrow();
  });

  it('toHaveBeenNthCalledWith', () => {
    expect(() => $expect({}).toHaveBeenNthCalledWith(1)).toThrow(TypeError);

    const mockFn = mock((a: any, b: any) => a + b);

    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(1, 1, 2)).toThrow();
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(-1, 1, 2)).toThrow();

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(1, 1, 2)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(1, 3, 4)).toThrow();

    mockFn(3, 4);
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(1, 1, 2)).not.toThrow();
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(1, 3, 4)).toThrow();
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(2, 1, 2)).toThrow();
    expect(() => $expect(mockFn).toHaveBeenNthCalledWith(2, 3)).not.toThrow();
  });
});
