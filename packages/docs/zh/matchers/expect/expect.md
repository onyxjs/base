## expect

> 簽名: `expect ( matchers: { [ key: string ]: Function }, expectation: any): any

`expect` 可讓您測試價值觀是否符合某些期望。可以將“期望”功能與“匹配器”配對以驗證所需的輸出或值。

### 例子

```ts
import { expect } from "@onyx/matchers";

console.log(expect(1).toBeTypeOf("number")); // true
console.log(expect("string").toHaveLength(6)); // true
console.log(expect(2).not.toBeTypeOf("number")); // false
console.log(expect("string").not.toHaveLength(6)); // false
```
