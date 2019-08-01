import isEqual from 'lodash.isequal';

export default function toBe(a: any, b: any): boolean {
  return isEqual(a, b) && (a !== b || Object.is(a, b));
}
