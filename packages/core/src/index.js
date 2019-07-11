'use strict';

module.exports = core;

function core() {
    // TODO
    // Describe fn
    // xDescribe fn
    // It fn
    // xIt fn

    const describe = (description, fn) => {
      try {
        fn();
      } catch(err) {
        return new Error('error', err);
      }
    };

    const it = (description, fn) => {
      try {
        fn();
      } catch(err) {
        return new Error('error', err);
      }
    };
}
