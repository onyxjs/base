import toHaveLength from '../toHaveLength';

describe('toHaveLength', () => {
  it('should have equal length', () => {
    expect(toHaveLength('string', 6)).toBeTruthy();
    expect(toHaveLength({}, 0)).toBeTruthy();
    expect(toHaveLength([1, 2, 3], 3)).toBeTruthy();
    expect(toHaveLength(undefined, 1)).toBeFalsy();
    expect(toHaveLength(null, 1)).toBeFalsy();
  });
});
