import spy from '../src/spy';

describe('Spy', () => {
  it('should create a spy function', () => {
    const obj = {
      fn: (a, b) => a + b,
    };
    const spyFn = spy(obj, 'fn');

    expect(spyFn.calls).toEqual([]);
    expect(spyFn(1, 2)).toBe(3);
    expect(spyFn.calls).toEqual([[1, 2]]);
    expect(obj.fn(1, 2)).toBe(3);
    expect(spyFn.calls).toEqual([[1, 2], [1, 2]]);
  });
});
