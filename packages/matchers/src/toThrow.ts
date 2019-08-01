// tslint:disable-next-line:ban-types
export default function toThrow(a: Function, b: string): boolean {
  try {
    a();
  } catch (e) {
    if (e.message === b) { return true; }
  }
  return false;
}
