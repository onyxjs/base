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

  it('toHaveReturned', () => {
    expect(() => $expect({}).toHaveReturned()).toThrow(TypeError);

    const mockFn = mock((a: any, b: any) => a + b);

    expect(() => $expect(mockFn).toHaveReturned()).toThrow();

    mockFn(1, 2);
    expect(() => $expect(mockFn).toHaveReturned()).not.toThrow();
  });

  it('toHaveReturnedWith', () => {
      expect(() => $expect({}).toHaveReturnedWith()).toThrow(TypeError);

      const mockFn = mock((a: any, b: any) => a + b);

      mockFn(1, 2);
      expect(() => $expect(mockFn).toHaveReturnedWith()).not.toThrow();
    });

  it('toHaveLastReturnedWith', () => {
      expect(() => $expect({}).toHaveLastReturnedWith(2)).toThrow(TypeError);

      const mockFn = mock((a: any, b: any) => a + b);

      expect(() => $expect(mockFn).toHaveLastReturnedWith('string')).toThrow();
      expect(() => $expect(mockFn).toHaveLastReturnedWith(1)).toThrow();

      mockFn(1, 2);
      expect(() => $expect(mockFn).toHaveLastReturnedWith(3)).not.toThrow();
      expect(() => $expect(mockFn).toHaveLastReturnedWith(1)).toThrow();

      mockFn('hello ', 'world');
      expect(() => $expect(mockFn).toHaveLastReturnedWith('hello world')).not.toThrow();
      expect(() => $expect(mockFn).toHaveLastReturnedWith(5)).toThrow();
    });

  it('toHaveNthReturnedWith', () => {
      expect(() => $expect({}).toHaveNthReturnedWith(1, 1)).toThrow(TypeError);

      const mockFn = mock((a: any, b: any) => a + b);

      expect(() => $expect(mockFn).toHaveNthReturnedWith(1, 1)).toThrow();
      expect(() => $expect(mockFn).toHaveNthReturnedWith(1, 'string')).toThrow();

      mockFn('hello ', 'world');
      expect(() => $expect(mockFn).toHaveNthReturnedWith(1, 'hello world')).not.toThrow();
      expect(() => $expect(mockFn).toHaveNthReturnedWith(1, 'world')).toThrow();

      mockFn(1, 5);
      expect(() => $expect(mockFn).toHaveNthReturnedWith(2, 6)).not.toThrow();
      expect(() => $expect(mockFn).toHaveNthReturnedWith(1, 1)).toThrow();

      mockFn.reset();
      mockFn(1, 5);
      expect(() => $expect(mockFn).toHaveNthReturnedWith(1, 6)).not.toThrow();
      expect(() => $expect(mockFn).toHaveNthReturnedWith(2, 6)).toThrow();
    });

  it('toHaveReturnedTimes', () => {
      expect(() => $expect({}).toHaveReturnedTimes(1)).toThrow(TypeError);

      const mockFn = mock((a: any, b: any) => a + b);

      expect(() => $expect(mockFn).toHaveReturnedTimes(0)).not.toThrow();

      mockFn(1, 5);
      expect(() => $expect(mockFn).toHaveReturnedTimes(1)).not.toThrow();
      expect(() => $expect(mockFn).toHaveReturnedTimes(0)).toThrow();

      mockFn(2, 3);
      expect(() => $expect(mockFn).toHaveReturnedTimes(2)).not.toThrow();
      expect(() => $expect(mockFn).toHaveReturnedTimes(1)).toThrow();

      mockFn.reset();
      mockFn(1, 1);
      expect(() => $expect(mockFn).toHaveReturnedTimes(1)).not.toThrow();
      expect(() => $expect(mockFn).toHaveReturnedTimes(0)).toThrow();
    });
});
