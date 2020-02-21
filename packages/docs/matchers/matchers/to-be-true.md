## toBeTrue (toBeTruthy)

> Signature: `toBeTrue (a: any): boolean`

`toBeTrue` matcher (aliased as `toBeTruthy`) checks whether the given value is truthy.

### Example

```ts
import { toBeTrue } from '@onyx/matchers';

console.log(toBeTrue(false)); // false
console.log(toBeTrue(undefined)); // false
console.log(toBeTrue(NaN)); // false
console.log(toBeTrue(0)); // false
console.log(toBeTrue(1)); // true
console.log(toBeTrue({})); // true
```
