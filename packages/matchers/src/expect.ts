import * as matchers from './matchers';

function expectations (expectation: any, not: boolean = false): { [key: string]: Function } {
  return Object.fromEntries(
    Object.entries(matchers)
      .map(([key, value]) => ([
        key,
        (...args: any[]) => {
          const result = value(expectation, ...args);
          if (result === not) throw new ExpectError(`${not ? 'not.' : ''}${key} failed`); // TODO diff
          return result;
        },
      ]))
  );
}

export default function expect (expectation): any {
  return {
    ...expectations(expectation, false),
    not: expectations(expectation, true),
  };
}

export class ExpectError extends Error {
  constructor (message) {
    super(message);
    this.name = 'ExpectError';
  }
};
