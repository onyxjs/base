## toBeNaN

> Signature: `toBeNaN (a: any, b: any): boolean`

`toBeNaN` matcher checks whether given value is `NaN`. If the value is string, `toBeNaN` will parse it.

### Example

```ts
import { toBeNaN } from '@onyx/matchers';

console.log(toBeNaN(NaN)); // true
console.log(toBeNaN('onyx')); // true
console.log(toBeNaN(1)); // false
console.log(toBeNaN(1337)); // false
```
