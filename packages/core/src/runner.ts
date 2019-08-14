import { EventEmitter } from 'events';
import Suite from '../src/suite';
import Test from '../src/test';

/**
 * @class
 * @param {Suite} suite
 */
export default class Runner extends EventEmitter {
  public suite: Suite;

  constructor(suite: Suite) {
    super();
    this.suite = suite;
  }

  /**
  * @public
  * @param {Suite} suite
  * @param {Runnable} fn
  */
  public runChildren(suite: Suite, fn: () => any) {}

  /**
   * @public
   * @param {Suite} suite 
   * @param {Runnable} fn 
   */
  public runSuite(suite: Suite, fn: () => any) {
    for (let child of suite.children) {
      if (child.type === 'Suite') {
        this.runSuite((suite), () => {
          fn();
        });
      }
    }

    this.runChildren(suite, () => {
      fn();
    });
  }
}
