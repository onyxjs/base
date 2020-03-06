## toEqual

> Signature: `toEqual (a: any, b: any): boolean`

`toEqual` matcher performs `type coercion` and checks the given parameters for loose equality.

### Example

```ts
import { toEqual } from '@onyx/matchers';

console.log(toEqual(1, '1')); // true
console.log(toEqual('string', ['string'])); // true
console.log(toEqual('five', 5)); // false
console.log(toEqual({}, {})); // false
```
