## toThrow

> Signature: `toThrow (a: Function, b: string | Function): boolean`

`toThrow` matcher checks that a function throws when it is called.

### Example

```ts
import { toThrow } from '@onyx/matchers';

const throwingFn = () => { throw new Error('error') };

console.log(toThrow(throwingFn, 'error')); // true
console.log(toThrow(() => throwingFn(), 'error')); // true
console.log(toThrow(() => { throw new Error('test1'); }, 'test')); // true
console.log(toThrow(() => undefined, 'test')); // false
```
