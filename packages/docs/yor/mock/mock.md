## mock

> Ibuwolu: `mock (fn: Function, cb?: (args: any[], result: any) => any): mock`

`mock` eleyi ma fi aye sile lati fi se atunse osi ma je ki a wo iwa objecti alaye wa ati metodi ninu unit testi wa.

### Apeere

```ts
import { mock } from '@onyx/mock';

const fn = (a: number, b: number) => a + b;
const mockFn = mock(fn);

console.log(mockFn(5, 5)); // 10
```
