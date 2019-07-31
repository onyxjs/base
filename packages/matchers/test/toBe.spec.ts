import toBe from '../src/toBe';

describe('toBe', () => {
  it('should match simple values', () => {
    expect(toBe(1, 1)).toBeTruthy();
    expect(toBe('onyx', 'onyx')).toBeTruthy();
    expect(toBe(0, 0)).toBeTruthy();
    expect(toBe(0, -1)).toBeFalsy();
  });

  it('should match objects', () => {
    expect(toBe({}, {})).toBeTruthy();
    expect(toBe({ a: 'b' }, { a: 'b' })).toBeTruthy();
    expect(toBe({ a: { b: 'c' } }, { a: { b: 'c' } })).toBeTruthy();
    expect(toBe({}, { a: 'b' })).toBeFalsy();
    expect(toBe({ a: 'b' }, { a: 'c' })).toBeFalsy();
  });

  it('should match NaN', () => {
    expect(toBe(NaN, NaN)).toBeTruthy();
    expect(toBe(NaN, 0)).toBeFalsy();
  });

  it('should differ 0 from -0', () => {
    expect(toBe(0, -0)).toBeFalsy();
  });
});
