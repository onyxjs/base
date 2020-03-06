## toBeFalse (toBeFalsy)

> Ibuwolu: `toBeFalse (a: any): boolean`

`toBeFalse` matcher (ole tun je `toBeFalsy`) se ayewo boya iye ti a fun o kin shey iro.

### Apeere

```ts
import { toBeFalse } from '@onyx/matchers';

console.log(toBeFalse(false)); // true
console.log(toBeFalse(undefined)); // true
console.log(toBeFalse(NaN)); // true
console.log(toBeFalse(0)); // true
console.log(toBeFalse(1)); // false
console.log(toBeFalse({})); // false
```
