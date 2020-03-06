## toEqual

> Ibuwolu: `toEqual (a: any, b: any): boolean`

`toEqual` matcher ma se `type coercion` ode tun ma shey ayewo parameta ti a fun ki oba le wo bi oshey da si.

### Apeere

```ts
import { toEqual } from '@onyx/matchers';

console.log(toEqual(1, '1')); // true
console.log(toEqual('string', ['string'])); // true
console.log(toEqual('five', 5)); // false
console.log(toEqual({}, {})); // false
```
