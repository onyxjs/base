## toThrow

> Ibuwolu: `toThrow (a: Function, b: string | Function): boolean`

`toThrow` matcher shey ayewo ise boya o ma so nkan jade ti a ba pe.

### Apeere

```ts
import { toThrow } from '@onyx/matchers';

const throwingFn = () => { throw new Error('error') };

console.log(toThrow(throwingFn, 'error')); // true
console.log(toThrow(() => throwingFn(), 'error')); // true
console.log(toThrow(() => { throw new Error('test1'); }, 'test')); // true
console.log(toThrow(() => undefined, 'test')); // false
```
