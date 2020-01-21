export const mockSymbol = Symbol('isMock');

// tslint:disable-next-line:interface-name
export interface Mock extends Function {
  calls: any[][];
  returns: any[];
  reset: () => void;
  [mockSymbol]: true;
}

// tslint:disable-next-line:ban-types
export default function mock(fn: Function, cb?: (args: any[], result: any) => any): Mock {
  const instance = ((...args: any[]) => {
    const result = fn(...args);
    if (cb) { cb(args, result); }
    instance.calls.push(args);
    instance.returns.push(result);
    return result;
  }) as unknown as Mock;
  instance.calls = [] as any[][];
  instance.returns = [] as any[];
  instance.reset = () => {
    instance.calls = [];
    instance.returns = [];
  };
  instance[mockSymbol] = true;

  return instance;
}

export function isMock(v: unknown): v is Mock {
  if (typeof v !== 'function') {
    return false;
  }

  return (v as Mock)[mockSymbol];
}
