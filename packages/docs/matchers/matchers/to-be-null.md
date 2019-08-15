## toBeNull

> Signature: `toBeNull (a: any): boolean`

`toBeNull` matcher checks if the given value is `null`.

### Example

```ts
import { toBeNull } from '@onyx/matchers';

console.log(toBeNull(null)); // true
console.log(toBeNull(1)); // false
```
