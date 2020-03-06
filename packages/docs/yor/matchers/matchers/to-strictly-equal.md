## toStrictlyEqual

> Ibuwolu: `toStrictlyEqual (a: any, b: any): boolean`

`toStrictlyEqual` matcher ma shey ayewo boya iye ti a fun yen shey deede pelu ara won ati boya iye yen je iru ikan na `value` and `type`.

### Apeere

```ts
import { toStrictlyEqual } from '@onyx/matchers';

console.log(toStrictlyEqual(0, 0)); // true
console.log(toStrictlyEqual('onyx', 'onyx')); // true
console.log(toStrictlyEqual(0, -1)); // false
console.log(toStrictlyEqual(0, '0')); // false
```
