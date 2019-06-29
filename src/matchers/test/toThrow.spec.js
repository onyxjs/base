import toThrow from '../toThrow';

describe('toThrow', () => {
  it('should check functions', () => {
    const throwingFn = () => { throw new Error('test'); };
    expect(toThrow(throwingFn, 'test')).toBeTruthy();
    expect(toThrow(() => throwingFn(), 'test')).toBeTruthy();
    expect(toThrow(() => {}, 'test')).toBeFalsy();
  });
});
