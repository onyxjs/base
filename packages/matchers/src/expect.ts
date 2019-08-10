function expectations(
  // tslint:disable-next-line:ban-types
  matchers: { [ key: string ]: Function },
  expectation: any,
  not: boolean = false,
  // tslint:disable-next-line:ban-types
): { [key: string]: Function } {
  const entries = Object.entries(matchers)
    .map(([key, value]) => [
      key,
      (...args: any[]) => {
        // @ts-ignore
        const result = value(expectation, ...args);
        if (result === not) { throw new ExpectError(`${not ? 'not.' : ''}${key} failed`); } // TODO diff
        return result;
      },
    ]);
  return Object.assign({}, ...Array.from(entries, ([k, v]: any[]) => ({[k]: v}) ));
}

export default function expect(
  // tslint:disable-next-line:ban-types
  matchers: { [ key: string ]: Function },
  expectation: any,
): any {
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
