## toBeDefined

> Ibuwolu: `toBeDefined (a: any): boolean`

`toBeDefined` shey ayewo iye ti o ti wa tele. yo da rara nikan pada `false` ti ko ba ti si iye na tele `undefined` fun igbewole wa

### Apeere

```ts
import { toBeDefined } from '@onyx/matchers';

console.log(toBeDefined(1)); // true
console.log(toBeDefined({}); // true
console.log(toBeDefined(NaN)); // true
console.log(toBeDefined(null)); // true
console.log(toBeDefined(undefined)); // false
```
