import { matchers, Matchers } from './matchers';

type Expectations = {
  [K in keyof typeof matchers]: (...args: any[]) => boolean // TODO: infer args
};

export function expectations(
  currentMatchers: Matchers,
  expectation: any,
  not: boolean = false,
): Expectations {
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

interface NegatedExpectations extends Expectations {
  not: Expectations;
}

export default function expect(
  expectation: any,
): NegatedExpectations {
  return {
    ...expectations(matchers, expectation, false),
    not: expectations(matchers, expectation, true),
  };
}

export class ExpectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpectError';
  }
}
