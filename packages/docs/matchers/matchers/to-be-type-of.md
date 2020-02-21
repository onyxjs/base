## toBeTypeOf

> Signature: `toBeTypeOf (a: any, b: Function): boolean`

`toBeTypeOf` matcher checks the first given argument's object type.

### Example

```ts
import { toBeTypeOf } from '@onyx/matchers';

console.log(toBeTypeOf('', 'string')); // true
console.log(toBeTypeOf(22, 'number')); // true
console.log(toBeTypeOf([], 'array')); // true
console.log(toBeTypeOf({}, 'boolean')); // false
```
