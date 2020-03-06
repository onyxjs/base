## toBeInstanceOf

> Signature: `toBeInstanceOf (a: any, b: Function): boolean`

`toBeInstanceOf` matcher checks whether the given first argument in instance of type given as second argument.

### Example

```ts
import { toBeInstanceOf } from '@onyx/matchers';

console.log(toBeInstanceOf(document, Document)); // true
console.log(toBeInstanceOf(document.body, Element)); // true
console.log(toBeInstanceOf([], Array)); // true
console.log(toBeInstanceOf({}, Element)); // false
```
