## toStrictlyEqual

> Signature: `toStrictlyEqual (a: any, b: any): boolean`

`toStrictlyEqual` matcher checks that the values given are the same `value` and `type`.

### Example

```ts
import { toStrictlyEqual } from '@onyx/matchers';

console.log(toStrictlyEqual(0, 0)); // true
console.log(toStrictlyEqual('onyx', 'onyx')); // true
console.log(toStrictlyEqual(0, -1)); // false
console.log(toStrictlyEqual(0, '0')); // false
```
