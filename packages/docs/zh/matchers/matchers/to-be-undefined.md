## toBeUndefined

> 簽名: `toBeUndefined (a: any): boolean`

`toBeUndefined` 匹配器檢查給定參數是否未定義。

### 例子

```ts
import { toBeUndefined } from "@onyx/matchers";

console.log(toBeUndefined("")); // false
console.log(toBeUndefined(undefined)); // true
console.log(toBeUndefined(null)); // false
console.log(toBeUndefined({})); // false
```
