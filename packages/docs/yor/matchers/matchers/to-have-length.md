## toHaveLength

> Ibuwolu: `toHaveLength (a: any, b: number): boolean`

`toHaveLength` matcher ma shey ayewo boya objecti ni properti length ode tun ma wo boya o se deede pelu iye o miran.

### Apeere

```ts
import { toHaveLength } from '@onyx/matchers';

console.log(toHaveLength({}, 0)); // true
console.log(toHaveLength('string', 6)); // true
console.log(toHaveLength(undefined, 1)); // false
console.log(toHaveLength(null, 1)); // false
```
