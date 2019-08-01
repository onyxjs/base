import * as matchers from './matchers';

function expectations (expectation: any, not: boolean = false): { [key: string]: Function } {
  const entries = Object.entries(matchers)
    .map(([key, value]) => [
      key,
      (...args: any[]) => {
        // @ts-ignore
        const result = value(expectation, ...args);
        if (result === not) throw new ExpectError(`${not ? 'not.' : ''}${key} failed`); // TODO diff
        return result;
      },
    ]);
  return Object.assign({}, ...Array.from(entries, ([k, v]: any[]) => ({[k]: v}) ));
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
