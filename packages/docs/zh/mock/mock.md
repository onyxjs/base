## mock

> 簽名: `mock (fn: Function, cb?: (args: any[], result: any) => any): mock`

`mock` 可讓您在單元測試中重新定義和模擬真實對象和方法的行為。

### 例子

```ts
import { mock } from "@onyx/mock";

const fn = (a: number, b: number) => a + b;
const mockFn = mock(fn);

console.log(mockFn(5, 5)); // 10
```
