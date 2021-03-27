import toBeNaN from '../src/toBeNaN'

describe('toBeNaN', () => {
  it('should match NaN and NaN strings', () => {
    expect(toBeNaN(NaN)).toBeTruthy()
    expect(toBeNaN('onyx')).toBeTruthy()
    expect(toBeNaN(0)).toBeFalsy()
    expect(toBeNaN(-32768)).toBeFalsy()
    expect(toBeNaN('1337')).toBeFalsy()
  })
})
