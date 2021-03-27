import $expect from '../src/expect'

describe('expect', () => {
  it('should expect values', () => {
    expect(() => $expect(1).toStrictlyEqual(1)).not.toThrow()
    expect(() => $expect(1).toStrictlyEqual(2)).toThrow()
  })

  it('should not expect values', () => {
    expect(() => $expect(1).not.toStrictlyEqual(1)).toThrow()
    expect(() => $expect(1).not.toStrictlyEqual(2)).not.toThrow()
  })
})
