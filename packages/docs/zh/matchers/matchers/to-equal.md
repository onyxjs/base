## toEqual

> 簽名: `toEqual (a: any, b: any): boolean`

`toEqual` 匹配器執行“類型強制”並檢查給定的參數是否鬆散相等。

### 例子

```ts
import { toEqual } from "@onyx/matchers";

console.log(toEqual(1, "1")); // true
console.log(toEqual("string", ["string"])); // true
console.log(toEqual("five", 5)); // false
console.log(toEqual({}, {})); // false
```
