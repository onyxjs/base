import _expect from './expect';
import * as matchers from './matchers';

export * from './matchers';
export { ExpectError } from './expect';
export default function expect(expectation: any): any {
  return _expect(matchers, expectation);
}
