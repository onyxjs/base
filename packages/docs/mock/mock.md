## mock

> Signature: `mock (fn: Function, cb?: (args: any[], result: any) => any): mock`

`mock` allows you to redefine and simulate behavior of real objects and methods in your unit tests.

### Example

```ts
import { mock } from '@onyx/mock';

const fn = (a: number, b: number) => a + b;
const mockFn = mock(fn);

console.log(mockFn(5, 5)); // 10
```
