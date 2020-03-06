## toBeTypeOf

> Ibuwolu: `toBeTypeOf (a: any, b: Function): boolean`

`toBeTypeOf` matcher shey ayewo fun iru igbewole arguementi akoko.

### Apeere

```ts
import { toBeTypeOf } from '@onyx/matchers';

console.log(toBeTypeOf('', 'string')); // true
console.log(toBeTypeOf(22, 'number')); // true
console.log(toBeTypeOf([], 'array')); // true
console.log(toBeTypeOf({}, 'boolean')); // false
```
