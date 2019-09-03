## toHaveLength

> Signature: `toHaveLength (a: any, b: number): boolean`

`toHaveLength` matcher checks that an object has a length property and it equals a certain numeric value.

### Example

```ts
import { toHaveLength } from '@onyx/matchers';

console.log(toHaveLength({}, 0)); // true
console.log(toHaveLength('string', 6)); // true
console.log(toHaveLength(undefined, 1)); // false
console.log(toEqual(toHaveLength(null, 1)); // false
```
