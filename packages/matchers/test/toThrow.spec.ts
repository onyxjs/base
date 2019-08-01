import toThrow from '../src/toThrow';

describe('toThrow', () => {
  it('should check functions', () => {
    const throwingFn = () => { throw new Error('test'); };
    expect(toThrow(throwingFn, 'test')).toBeTruthy();
    expect(toThrow(() => throwingFn(), 'test')).toBeTruthy();
    expect(toThrow(() => undefined, 'test')).toBeFalsy();
    expect(toThrow(() => { throw new Error('test1'); }, 'test')).toBeFalsy();
  });
});
