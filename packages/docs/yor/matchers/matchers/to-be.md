## toBe

> Ibuwolu: `toBe (a: any, b: any): boolean`

`toBe` matcher shey afilo `lodash.isEqual` ati `Object.is` labe nkan afibo lati fi shey afiwe awon iye. ode ma da ooto pada `true` ti awon iye yen ba jo arawon, `false` o si ma da rara pada ti awon iye yen ko ba jo arawon.

### Apeere

```ts
import { toBe } from '@onyx/matchers';

console.log(toBe(1, 1)); // true
console.log(toBe({}, {})); // true
console.log(toBe(NaN, NaN)); // true
console.log(toBe(1, 2)); // false
console.log(toBe(NaN, null)); // false
console.log(toBe(undefined, null)); // false
```
