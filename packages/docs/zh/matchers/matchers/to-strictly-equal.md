## toStrictlyEqual

> 簽名: `toStrictlyEqual (a: any, b: any): boolean`

`toStrictlyEqual` 匹配器檢查給定的值是否與“值”和“類型”相同。

### 例子

```ts
import { toStrictlyEqual } from "@onyx/matchers";

console.log(toStrictlyEqual(0, 0)); // true
console.log(toStrictlyEqual("onyx", "onyx")); // true
console.log(toStrictlyEqual(0, -1)); // false
console.log(toStrictlyEqual(0, "0")); // false
```
