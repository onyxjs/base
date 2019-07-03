import toBeFalse from '../toBeFalse';

describe('toBeFalse', () => {
  it('should match true and false', () => {
    expect(toBeFalse(false)).toBeTruthy();
    expect(toBeFalse(true)).toBeFalsy();
  });
});
