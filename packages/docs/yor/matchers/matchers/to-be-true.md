## toBeTrue (toBeTruthy)

> Ibuwolu: `toBeTrue (a: any): boolean`

`toBeTrue` matcher (abi ki a pe ni `toBeTruthy`) shey ayewo boya iye ti a fun je ooto

### Apeere

```ts
import { toBeTrue } from '@onyx/matchers';

console.log(toBeTrue(false)); // false
console.log(toBeTrue(undefined)); // false
console.log(toBeTrue(NaN)); // false
console.log(toBeTrue(0)); // false
console.log(toBeTrue(1)); // true
console.log(toBeTrue({})); // true
```
