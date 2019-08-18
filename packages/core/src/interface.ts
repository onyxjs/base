import Suite from './suite';
import Test from './test';

const root = new Suite('Tests');
export { root };

export type ItFn = (description: string, fn: () => void) => Test;
// tslint:disable-next-line:interface-name
export interface It extends ItFn {
  skip: ItFn;
}
export type DescribeCallback = (it: It) => void;

// istanbul ignore next
function _it(description: string, fn: () => void, suite: Suite, skip = false) {
  const test = new Test(description, fn, skip);
  suite.addChild(test);
  return test;
}

// istanbul ignore next
function _describe(description: string, cb: DescribeCallback, skip = false): Suite {
  const suite = new Suite(description, skip);

  const it = (testDescription: string, fn: () => void) => _it(testDescription, fn, suite, false);
  it.skip = (testDescription: string, fn: () => void) => _it(testDescription, fn, suite, true);
  cb(it);

  root.addChild(suite);
  return suite;
}

const describe = (description: string, cb: DescribeCallback) => _describe(description, cb, false);
describe.skip = (description: string, cb: DescribeCallback) => _describe(description, cb, true);

export default describe;
