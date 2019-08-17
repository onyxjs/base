import { EventEmitter } from 'events';
import Suite from '../src/suite';
import Test from '../src/test';

export default class Runner extends EventEmitter {
  /**
   * @public
   * @param {Suite} suite
   * @param {Function} fn
   */
  public static runSuite(suite: Suite, fn: () => any) {
    for (const child of suite.children) {
      if (child instanceof Suite) {
        this.runSuite(child, fn);
      } else if (child instanceof Test) {
        this.runTest(child, fn);
      }
    }
  }

  /**
   * @public
   * @param {Test} test
   * @param {Function} fn
   */
  public static runTest(test: Test, fn: () => any) {/*comment*/}
}
