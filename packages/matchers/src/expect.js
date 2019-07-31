import * as matchers from './matchers';

function expectations (expectation, not = false) {
  return Object.fromEntries(
    Object.entries(matchers)
      .map(([key, value]) => ([
        key,
        (...args) => {
          const result = value(expectation, ...args);
          if (result === not) throw new ExpectError(`${not ? 'not.' : ''}${key} failed`); // TODO diff
          return result;
        },
      ]))
  );
}

export default function expect (expectation) {
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
