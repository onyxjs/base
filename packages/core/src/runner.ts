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
    for (let child of suite.children) {
      if (child.type === 'Suite') {
        this.runSuite(child as Suite, fn);
      } else {
        this.runTest(child as Test, fn);
      }
    }
  }

  /**
   * @public
   * @param {Test} test 
   * @param {Function} fn 
   */
  public static runTest(test: Test, fn: () => any) {}
}
