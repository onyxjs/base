import toBe from './toBe';
import toBeDefined from './toBeDefined';
import toBeFalse from './toBeFalse';
import toBeFalsy from './toBeFalse';
import toBeInstanceOf from './toBeInstanceOf';
import toBeNaN from './toBeNaN';
import toBeNull from './toBeNull';
import toBeTrue from './toBeTrue';
import toBeTruthy from './toBeTrue';
import toBeTypeOf from './toBeTypeOf';
import toBeUndefined from './toBeUndefined';
import toContain from './toContain';
import toEqual from './toEqual';
import toHaveLength from './toHaveLength';
import toStrictlyEqual from './toStrictlyEqual';
import toThrow from './toThrow';

export interface AnyMatchers {
  [key: string]: (expectation: any, ...args: any[]) => boolean;
}

export let matchers = {
  toBe,
  toBeDefined,
  toBeFalse,
  toBeFalsy,
  toBeInstanceOf,
  toBeNaN,
  toBeNull,
  toBeTrue,
  toBeTruthy,
  toBeTypeOf,
  toBeUndefined,
  toContain,
  toEqual,
  toHaveLength,
  toStrictlyEqual,
  toThrow,
};
type BuiltInMatchers = typeof matchers & AnyMatchers;
export namespace onyx {
  export type Matchers = BuiltInMatchers;
}

export function extendMatchers(ext: AnyMatchers): void {
  matchers = {
    ...matchers,
    ...ext,
  };
}
