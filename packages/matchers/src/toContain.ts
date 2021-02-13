export default function toContain(a: any[] | { [key: string]: any }, b: any): boolean {
  if (Array.isArray(a)) {
    return a.indexOf(b) >= 0;
  } else if (typeof a === 'object') {
    return Object.values(a).indexOf(b) >= 0;
  }
  return false;
}
