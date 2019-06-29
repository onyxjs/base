const isEqual = require('lodash.isequal');

export default function toBe(a, b) {
  return isEqual(a, b) && (a !== b || Object.is(a, b));
}
