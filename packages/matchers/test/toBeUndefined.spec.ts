import toBeUndefined from '../src/toBeUndefined'

describe('toBeUndefined', () => {
  it('should match simple values', () => {
    expect(toBeUndefined(undefined)).toBeTruthy()
    expect(toBeUndefined(null)).toBeFalsy()
    expect(toBeUndefined(NaN)).toBeFalsy()
    expect(toBeUndefined(0)).toBeFalsy()
    expect(toBeUndefined({})).toBeFalsy()
  })
})
