## toBeFalse (toBeFalsy)

> 簽名: `toBeFalse (a: any): boolean`

`toBeFalse` 匹配器 (別名為`toBeFalsy`) 檢查給定值是否為假。

### 例子

```ts
import { toBeFalse } from "@onyx/matchers";

console.log(toBeFalse(false)); // true
console.log(toBeFalse(undefined)); // true
console.log(toBeFalse(NaN)); // true
console.log(toBeFalse(0)); // true
console.log(toBeFalse(1)); // false
console.log(toBeFalse({})); // false
```
