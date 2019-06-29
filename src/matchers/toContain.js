export default function toContain(a, b) {
  if (typeof a[Symbol.iterator] === 'function') {
    return a.indexOf(b) >= 0;
  } else if (typeof a === 'object') {
    return Object.values(a).indexOf(b) >= 0;
  }
}
