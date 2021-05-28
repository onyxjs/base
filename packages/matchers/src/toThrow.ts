export default function toThrow(a: (...args: any[]) => any, b?: string | Function): boolean {
  try {
    a()
  } catch (e) {
    if (typeof b === 'undefined') {
      return true
    } else if (typeof b === 'string') {
      return e.message.includes(b) || e.name === b
    } else {
      return e.name === b.name
    }
  }
  return false
}
