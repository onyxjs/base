## toBeInstanceOf

> Ibuwolu: `toBeInstanceOf (a: any, b: Function): boolean`

`toBeInstanceOf` matcher shey ayewo boya iru igbewole arguementi akoko ni iru igbewole arguementi elekeji.

### Apeere

```ts
import { toBeInstanceOf } from '@onyx/matchers';

console.log(toBeInstanceOf(document, Document)); // true
console.log(toBeInstanceOf(document.body, Element)); // true
console.log(toBeInstanceOf([], Array)); // true
console.log(toBeInstanceOf({}, Element)); // false
```
