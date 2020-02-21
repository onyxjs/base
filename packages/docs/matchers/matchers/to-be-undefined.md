## toBeUndefined

> Signature: `toBeUndefined (a: any): boolean`

`toBeUndefined` matcher checks if the given argument is undefined.

### Example

```ts
import { toBeUndefined } from '@onyx/matchers';

console.log(toBeUndefined('')); // false
console.log(toBeUndefined(undefined)); // true
console.log(toBeUndefined(null)); // false
console.log(toBeUndefined({})); // false
```
