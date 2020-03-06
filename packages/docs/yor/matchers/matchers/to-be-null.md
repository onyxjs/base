## toBeNull

> Ibuwolu: `toBeNull (a: any): boolean`

`toBeNull` matcher shey ayewo iye ti a fun boya o je `null`.

### Apeere

```ts
import { toBeNull } from '@onyx/matchers';

console.log(toBeNull(null)); // true
console.log(toBeNull(1)); // false
```
