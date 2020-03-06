## expect

> ibuwolu: `expect ( matchers: { [ key: string ]: Function }, expectation: any): any`

`expect` ofi aye sile lati fi shey igbeyewo iwulo lori awon iye ko kan ki o ba le pade awon ireti to daaju . ise `expect` le so owo po pelu `matcher` lati shey afowosi iye ireti to daju ti o si wu wa.

### Apeere

```ts
import { expect } from '@onyx/matchers';

console.log(expect(1).toBeTypeOf('number')); // true
console.log(expect('string').toHaveLength(6)); // true
console.log(expect(2).not.toBeTypeOf('number')); // false
console.log(expect('string').not.toHaveLength(6)); // false
```
