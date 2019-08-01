export class Mock extends Function {
  public calls: any[][];
  public returns: any[];
  public reset: () => void;
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
