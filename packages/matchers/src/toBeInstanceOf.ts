export default function toBeInstanceOf(a: any, b: (...args: any[]) => any): boolean {
  return (a instanceof b);
}
