## toContain

> ibuwolu: `toContain (a: any[] | object, b: any): boolean`

`toContain` matcher shey ayewo parameta ti akooko ni boya o wa ni inu parameta elekeji.

### Apeere

```ts
import { toContain } from '@onyx/matchers';

console.log(toContain([1], 1)); // true
console.log(toContain({a: 'b'}, 'b')); // true
console.log(toContain([{}, 1, 'onyx'], 'onyx')); // true
console.log(toContain(1 as any, 'onyx')); // false
```
