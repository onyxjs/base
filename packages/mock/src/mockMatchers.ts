import { extendMatchers } from '@onyx/matchers/src';
import isEqual from 'lodash.isequal';
import { isMock } from './mock';

const extension = {
  toHaveBeenCalled: (m: unknown): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }

    return m.calls.length > 0;
  },

  toHaveBeenCalledTimes: (m: unknown, times: number): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }

    return m.calls.length >= times;
  },

  toHaveBeenCalledWith: (m: unknown, ...args: any[]): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }

    return m.calls.some((x) => isEqual(x.slice(0, args.length), args));
  },

  toHaveBeenLastCalledWith: (m: unknown, ...args: any[]): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }
    if (!m.calls.length) {
      return false;
    }

    const lastCall = m.calls[m.calls.length - 1];
    return isEqual(lastCall.slice(0, args.length), args);
  },

  toHaveBeenNthCalledWith: (m: unknown, n: number, ...args: any[]): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }
    n--; // start with 1
    if (n < 0 || n >= m.calls.length) {
      return false;
    }

    const nthCall = m.calls[n];
    return isEqual(nthCall.slice(0, args.length), args);
  },

  toHaveReturnedWith: (m: unknown, ...args: any[]): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }

    return m.returns.length > 0;
  },

  toHaveLastReturnedWith: (m: unknown, returnValue: any): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }

    if (!m.returns.length) {
      return false;
    }

    const lastReturned = m.returns[m.returns.length - 1];
    return isEqual(lastReturned, returnValue);
  },

  toHaveNthReturnedWith: (m: unknown, n: number, returnValue: any): boolean => {
    if (!isMock(m)) {
      throw new TypeError('expected value is not a mock function');
    }

    n--;
    if (n < 0 || n >= m.returns.length) {
      return false;
    }

    const nthReturn = m.returns[n];
    return isEqual(nthReturn, returnValue);
  },

};

type Extension = typeof extension;
declare module '@onyx/matchers/src' {
  namespace onyx {
    // tslint:disable-next-line:no-empty-interface
    interface Matchers extends Extension {}
  }
}

export default extension;

extendMatchers(extension);
