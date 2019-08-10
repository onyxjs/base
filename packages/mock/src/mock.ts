export interface Mock extends Function {
  calls: any[][];
  returns: any[];
  reset: () => void;
}

// tslint:disable-next-line:ban-types
export default function mock(fn: Function, cb?: (args: any[], result: any) => any): Mock {
  const instance = (...args: any[]) => {
    const result = fn(...args);
    if (cb) { cb(args, result); }
    instance.calls.push(args);
    instance.returns.push(result);
    return result;
  };
  instance.calls = [] as any[][];
  instance.returns = [] as any[];
  instance.reset = () => {
    instance.calls = [];
    instance.returns = [];
  };

  return instance as Mock;
}
