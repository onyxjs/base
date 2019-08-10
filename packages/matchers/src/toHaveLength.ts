export default function toHaveLength(a: any, b: number) {
  if (!a) { return false; }

  if (typeof a === 'object') {
    return Object.keys(a).length === b;
  } else {
    return a.length === b;
  }
}
