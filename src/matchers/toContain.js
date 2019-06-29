export default function toContain(a, b) {
  if (Array.isArray(a)) {
    return a.indexOf(b) >= 0;
  } else if (typeof a === 'object') {
    return Object.values(a).indexOf(b) >= 0;
  }
  return false;
}
