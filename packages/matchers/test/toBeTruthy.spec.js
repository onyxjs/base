import toBeTruthy from '../src/toBeTrue';

describe('toBeTruthy', () => {
  it('Should return truthy', () => {
    expect(toBeTruthy('string')).toBeTruthy();
    expect(toBeTruthy({})).toBeTruthy();
    expect(toBeTruthy(Infinity)).toBeTruthy();
    expect(toBeTruthy(0)).toBeFalsy();
  });
});
