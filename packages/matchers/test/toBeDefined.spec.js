import toBeDefined from '../src/toBeDefined';

describe('toBeDefined', () => {
  it('should match simple values', () => {
    expect(toBeDefined(1)).toBeTruthy();
    expect(toBeDefined('onyx')).toBeTruthy();
    expect(toBeDefined(null)).toBeTruthy();
    expect(toBeDefined({})).toBeTruthy();
    expect(toBeDefined(false)).toBeTruthy();
    expect(toBeDefined(undefined)).toBeFalsy();
  });
});
