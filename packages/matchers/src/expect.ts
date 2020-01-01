import { AnyMatchers, matchers, onyx } from './matchers';

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
type Expectations<M extends AnyMatchers> = {
  [K in keyof M]: OmitFirstArg<M[K]>
};

export function expectations<M extends AnyMatchers = AnyMatchers>(
  currentMatchers: M,
  expectation: any,
  not: boolean = false,
): Expectations<M> {
  const entries = Object.entries(currentMatchers)
    .map(([key, value]) => [
      key,
      (...args: any[]) => {
        const result = value(expectation, ...args);
        if (result === not) { throw new ExpectError(`${not ? 'not.' : ''}${key} failed`); } // TODO diff
        return result;
      },
    ]);
  return Object.assign({}, ...Array.from(entries, ([k, v]: any[]) => ({[k]: v}) ));
}

type NegatedExpectations<M extends AnyMatchers> = Expectations<M> & {
  not: Expectations<M>;
};

export default function expect<M extends onyx.Matchers = onyx.Matchers>(
  expectation: any,
): NegatedExpectations<M> {
  return {
    ...expectations<M>(matchers as M, expectation, false),
    not: expectations<M>(matchers as M, expectation, true),
  };
}

export class ExpectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpectError';
  }
}
