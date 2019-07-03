import toEqual from '../toEqual';

describe('toEqual', () => {
  it('should match simple values', () => {
    expect(toEqual(1, 1)).toBeTruthy();
    expect(toEqual('onyx', 'onyx')).toBeTruthy();
    expect(toEqual(0, 0)).toBeTruthy();
    expect(toEqual(0, '0')).toBeTruthy();
    expect(toEqual(0, -1)).toBeFalsy();
  });
});
