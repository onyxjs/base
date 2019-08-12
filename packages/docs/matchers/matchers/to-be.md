## toBe

> Signature: `toBe (a: any, b: any): boolean`

`toBe` matcher uses `lodash.isEqual` and `Object.is` under the hood to compare values. It returns `true` if values are identical, `false` in any other case.

### Example

```ts
import { toBe } from '@onyx/matchers';

console.log(toBe(1, 1)); // true
console.log(toBe({}, {})); // true
console.log(toBe(NaN, NaN)); // true
console.log(toBe(1, 2)); // false
console.log(toBe(NaN, null)); // false
console.log(toBe(undefined, null)); // false
```
