## toBe

> 簽名: `toBe (a: any, b: any): boolean`

`toBe` 匹配器在幕後使用`lodash.isEqual`和`Object.is`比較值。如果值相同，則返回“ true”，否則返回“ false”。

### 例子

```ts
import { toBe } from "@onyx/matchers";

console.log(toBe(1, 1)); // true
console.log(toBe({}, {})); // true
console.log(toBe(NaN, NaN)); // true
console.log(toBe(1, 2)); // false
console.log(toBe(NaN, null)); // false
console.log(toBe(undefined, null)); // false
```
