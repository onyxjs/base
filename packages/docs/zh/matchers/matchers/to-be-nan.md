## toBeNaN

> 簽名: `toBeNaN (a: any, b: any): boolean`

`toBeNaN` 匹配器檢查給定值是否為`NaN`。如果值是字符串，`toBeNaN`將解析它。

### 例子

```ts
import { toBeNaN } from "@onyx/matchers";

console.log(toBeNaN(NaN)); // true
console.log(toBeNaN("onyx")); // true
console.log(toBeNaN(1)); // false
console.log(toBeNaN(1337)); // false
```
