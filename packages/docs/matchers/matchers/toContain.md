## toContain

> Signature: `toContain (a: Object || Array, b: any): boolean`

`toContain` matcher checks if the first given parameter contains the second given parameter.

### Example

```ts
import { toContain } from '@onyx/matchers';

console.log(toContain([1], 1)); // true
console.log(toContain({a: 'b'}, 'b')); // true
console.log(toContain([{}, 1, 'onyx'], 'onyx')); // true
console.log(toContain(1 as any, 'onyx')); // false
```
