/**
 * `Runnable` class that abstracts basic functionality shared
 * between the `Test` and `Suite` classes.
 * 
 * @class
 * @param {String} title
 * @param {Function} fn
 */
export default class Runnable {
  title = '';
  fn = null;
  pending = null;
  sync = null;
  async = !sync;

  constructor(title, fn) {
    this.title = title;
    this.fn = fn;
    this.async = fn && fn.length;
    this.sync = !this.async;
    this.pending = false;
  }


  /**
   * Check if this runnable or its parent suite is marked as pending.
   *
   * @private
   */
  _isPending() {
    return this.pending || this.isPending();
  }
}
