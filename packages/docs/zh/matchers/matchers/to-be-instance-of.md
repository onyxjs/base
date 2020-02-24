## toBeInstanceOf

> 簽名: `toBeInstanceOf (a: any, b: Function): boolean`

`toBeInstanceOf` 匹配器檢查給定類型的實例中給定的第一個參數是否為第二個參數。

### 例子

```ts
import { toBeInstanceOf } from "@onyx/matchers";

console.log(toBeInstanceOf(document, Document)); // true
console.log(toBeInstanceOf(document.body, Element)); // true
console.log(toBeInstanceOf([], Array)); // true
console.log(toBeInstanceOf({}, Element)); // false
```
