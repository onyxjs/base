## toBeDefined

> Signature: `toBeDefined (a: any): boolean`

`toBeDefined` checks if the value is defined. It only returns `false` when it has `undefined` as input.

### Example

```ts
import { toBeDefined } from '@onyx/matchers';

console.log(toBeDefined(1)); // true
console.log(toBeDefined({}); // true
console.log(toBeDefined(NaN)); // true
console.log(toBeDefined(null)); // true
console.log(toBeDefined(undefined)); // false
```
