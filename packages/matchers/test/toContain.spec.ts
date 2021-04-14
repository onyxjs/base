import toContain from '../src/toContain'

describe('toContain', () => {
  it('should search in arrays', () => {
    expect(toContain([1], 1)).toBeTruthy()
    expect(toContain(['onyx', 1337, 7357], 'onyx')).toBeTruthy()
    expect(toContain([1337, 7357], 'onyx')).toBeFalsy()
    expect(toContain([], 'onyx')).toBeFalsy()
  })

  it('should search in objects', () => {
    expect(toContain({ a: 1 }, 1)).toBeTruthy()
    expect(toContain({ a: 'onyx', b: 1337, c: 7357}, 'onyx')).toBeTruthy()
    expect(toContain({ a: 1337, b: 7357 }, 'onyx')).toBeFalsy()
    expect(toContain({}, 'onyx')).toBeFalsy()
  })

  it('should return false if first argument neither object or array', () => {
    expect(toContain(1 as any, 'onyx')).toBeFalsy()
  })
})
