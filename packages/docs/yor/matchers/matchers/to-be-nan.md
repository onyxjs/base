## toBeNaN

> Ibuwolu: `toBeNaN (a: any, b: any): boolean`

`toBeNaN` matcher ma Shey ayewo boya iye ti a fun je `NaN`. Ti iye na ba je string to, `toBeNaN` ma parse e.

### Apeere

```ts
import { toBeNaN } from '@onyx/matchers';

console.log(toBeNaN(NaN)); // true
console.log(toBeNaN('onyx')); // true
console.log(toBeNaN(1)); // false
console.log(toBeNaN(1337)); // false
```
