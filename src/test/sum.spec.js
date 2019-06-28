import sum from '../sum'

describe('sum.js', () => {
  it('should sum 2 numbers', () => {
    expect(sum(2, 2)).toBe(4);
  });
});
