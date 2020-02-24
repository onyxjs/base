## toHaveLength

> 簽名: `toHaveLength (a: any, b: number): boolean`

`toHaveLength` 匹配器檢查對像是否具有 length 屬性，並且該對像等於某個數值。

### 例子

```ts
import { toHaveLength } from "@onyx/matchers";

console.log(toHaveLength({}, 0)); // true
console.log(toHaveLength("string", 6)); // true
console.log(toHaveLength(undefined, 1)); // false
console.log(toHaveLength(null, 1)); // false
```
