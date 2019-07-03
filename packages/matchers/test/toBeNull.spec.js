import toBeNull from '../toBeNull';

describe('toBeNull', () => {
  it('should match simple values', () => {
    expect(toBeNull(null)).toBeTruthy();
    expect(toBeNull(0)).toBeFalsy();
    expect(toBeNull(undefined)).toBeFalsy();
    expect(toBeNull(NaN)).toBeFalsy();
  });
});
