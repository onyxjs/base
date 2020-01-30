// tslint:disable-next-line:ban-types
export default function toThrow(a: Function, b?: string | Function): boolean {
  try {
    a();
  } catch (e) {
    if (typeof b === 'undefined') {
      return true;
    } else if (typeof b === 'string') {
      return e.message.includes(b) || e.name === b;
    } else {
      return e.name === b.name;
    }
  }
  return false;
}
