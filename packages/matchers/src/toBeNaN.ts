export default function toBeNaN(a: string | number): boolean {
  if (typeof a === 'number') { return isNaN(a) } else { return isNaN(parseFloat(a)) }
}
