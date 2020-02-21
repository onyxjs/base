## expect

> Signature: `expect ( matchers: { [ key: string ]: Function }, expectation: any): any

`expect` allows you to test that values meet certain expectations. The `expect` function can be paired with a `matcher` to validate a desired output or value.

### Example

```ts
import { expect } from '@onyx/matchers';

console.log(expect(1).toBeTypeOf('number')); // true
console.log(expect('string').toHaveLength(6)); // true
console.log(expect(2).not.toBeTypeOf('number')); // false
console.log(expect('string').not.toHaveLength(6)); // false
```
