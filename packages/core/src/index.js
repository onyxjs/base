'use strict';

module.exports = core;

function core() {

    const describe = (description, fn) => {
      return new Suite(description, fn);
    };

    // const xdescribe = () => {};

    const it = (description, fn) => {
      return new Test(description, fn);
    };

    // const xit = () => {};
}
