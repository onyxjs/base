## toBeFalse (toBeFalsy)

> Signature: `toBeFalse (a: any): boolean`

`toBeFalse` matcher (aliased as `toBeFalsy`) checks whether the given value is falsy.

### Example

```ts
import { toBeFalse } from '@onyx/matchers';

console.log(toBeFalse(false)); // true
console.log(toBeFalse(undefined)); // true
console.log(toBeFalse(NaN)); // true
console.log(toBeFalse(0)); // true
console.log(toBeFalse(1)); // false
console.log(toBeFalse({})); // false
```
