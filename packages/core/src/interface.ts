import Suite, { isSuite, rootSymbol } from './suite';
import Test from './test';

const root = new Suite('root');
root[rootSymbol] = true;
let currentRoot: Suite = root;

export const getCurrentRoot = () => currentRoot;
export const setCurrentRoot = (v: Suite) => {
  if (!isSuite(v)) { return; }
  currentRoot = v;
};

export { root, currentRoot };

// istanbul ignore next internal
function _it(description: string, fn: () => void, skip = false) {
  if (currentRoot.isRoot()) {
    throw new Error(`"${description}" "it" should not be called outside of "describe" block`);
  }

  const test = new Test(description, fn, skip, currentRoot);

  currentRoot.addChild(test);
  return test;
}

export type ItFn = (description: string, fn: () => void) => Test;
// tslint:disable-next-line:interface-name
export interface It extends ItFn {
  skip: ItFn;
}

const it: It = (description: string, fn: () => void) => _it(description, fn, false);
it.skip = (description: string, fn: () => void) => _it(description, fn, true);

// istanbul ignore next internal
function _describe(description: string, fn: () => void, skip = false): Suite {
  const suite = new Suite(description, skip, currentRoot);

  currentRoot = suite;
  fn();
  if (!suite.skip && suite.children.length <= 0) {
    console.warn(`suite "${suite.getFullDescription()}" doesn't have any child tests or suites.`);
  }
  currentRoot = currentRoot.parent || root;

  currentRoot.addChild(suite);
  return suite;
}

export type DescribeFn = (description: string, fn: () => void) => Suite;
// tslint:disable-next-line:interface-name
export interface Describe extends DescribeFn {
  skip: DescribeFn;
}

const describe: Describe = (description: string, fn: () => void) => _describe(description, fn, false);
describe.skip = (description: string, fn: () => void) => _describe(description, fn, true);

export { it, describe };
