## toBeTypeOf

> 簽名: `toBeTypeOf (a: any, b: Function): boolean`

`toBeTypeOf` 匹配器檢查第一個給定參數的對像類型。

### 例子

```ts
import { toBeTypeOf } from "@onyx/matchers";

console.log(toBeTypeOf("", "string")); // true
console.log(toBeTypeOf(22, "number")); // true
console.log(toBeTypeOf([], "array")); // true
console.log(toBeTypeOf({}, "boolean")); // false
```
