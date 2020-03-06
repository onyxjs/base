## toBeNull

> 簽名: `toBeNull (a: any): boolean`

`toBeNull` 匹配器檢查給定的值是否為 `null`。

### 例子

```ts
import { toBeNull } from "@onyx/matchers";

console.log(toBeNull(null)); // true
console.log(toBeNull(1)); // false
```
