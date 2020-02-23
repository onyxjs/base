## toThrow

> 簽名: `toThrow (a: Function, b: string | Function): boolean`

`toThrow` 匹配器檢查函數在調用時是否拋出。

### 例子

```ts
import { toThrow } from "@onyx/matchers";

const throwingFn = () => {
  throw new Error("error");
};

console.log(toThrow(throwingFn, "error")); // true
console.log(toThrow(() => throwingFn(), "error")); // true
console.log(
  toThrow(() => {
    throw new Error("test1");
  }, "test")
); // true
console.log(toThrow(() => undefined, "test")); // false
```
