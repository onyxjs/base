## toBeUndefined

> Ibuwolu: `toBeUndefined (a: any): boolean`

`toBeUndefined` matcher shey ayewo fun arguementi igbewole boya ko si tele.

### Apeere

```ts
import { toBeUndefined } from '@onyx/matchers';

console.log(toBeUndefined('')); // false
console.log(toBeUndefined(undefined)); // true
console.log(toBeUndefined(null)); // false
console.log(toBeUndefined({})); // false
```
