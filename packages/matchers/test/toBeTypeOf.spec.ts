import toBeTypeOf from '../src/toBeTypeOf'

describe('toBeTypeOf', () => {
  it('should match simple values', () => {
    expect(toBeTypeOf(1, 'number')).toBeTruthy()
    expect(toBeTypeOf('onyx', 'string')).toBeTruthy()
    expect(toBeTypeOf([], 'object')).toBeTruthy()
    expect(toBeTypeOf({}, 'object')).toBeTruthy()
    expect(toBeTypeOf(0, 'object')).toBeFalsy()
  })
})
