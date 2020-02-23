## toBeTrue (toBeTruthy)

> 簽名: `toBeTrue (a: any): boolean`

`toBeTrue` 匹配器（別名為 `toBeTruthy`) 檢查給定的值是否真實。

### 例子

```ts
import { toBeTrue } from "@onyx/matchers";

console.log(toBeTrue(false)); // false
console.log(toBeTrue(undefined)); // false
console.log(toBeTrue(NaN)); // false
console.log(toBeTrue(0)); // false
console.log(toBeTrue(1)); // true
console.log(toBeTrue({})); // true
```
