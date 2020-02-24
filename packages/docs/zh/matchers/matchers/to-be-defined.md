## toBeDefined

> 簽名: `toBeDefined (a: any): boolean`

`toBeDefined` 檢查值是否已定義。僅當輸入為“ undefined”時，才返回“ false”。

### 例子

```ts
import { toBeDefined } from '@onyx/matchers';

console.log(toBeDefined(1)); // true
console.log(toBeDefined({}); // true
console.log(toBeDefined(NaN)); // true
console.log(toBeDefined(null)); // true
console.log(toBeDefined(undefined)); // false
```
