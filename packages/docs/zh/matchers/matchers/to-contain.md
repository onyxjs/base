## toContain

> 簽名: `toContain (a: any[] | object, b: any): boolean`

`toContain` 匹配器檢查第一個給定參數是否包含第二個給定參數。

### 例子

```ts
import { toContain } from "@onyx/matchers";

console.log(toContain([1], 1)); // true
console.log(toContain({ a: "b" }, "b")); // true
console.log(toContain([{}, 1, "onyx"], "onyx")); // true
console.log(toContain(1 as any, "onyx")); // false
```
