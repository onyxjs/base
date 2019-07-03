import toStrictlyEqual from '../toStrictlyEqual';

describe('toEqual', () => {
  it('should match simple values', () => {
    expect(toStrictlyEqual(1, 1)).toBeTruthy();
    expect(toStrictlyEqual('onyx', 'onyx')).toBeTruthy();
    expect(toStrictlyEqual(0, 0)).toBeTruthy();
    expect(toStrictlyEqual(0, -1)).toBeFalsy();
    expect(toStrictlyEqual(0, '0')).toBeFalsy();
  });
});
