export interface Mock extends Function {
  calls: any[][]
  returns: any[]
  reset: () => void
}

export default function mock (fn: Function, cb?: (args: any[], result: any) => any): Mock {
  const mock = function (...args: any[]) {
    const result = fn(...args);
    if (cb) cb(args, result);
    mock.calls.push(args);
    mock.returns.push(result);
    return result;
  };
  mock.calls = [] as any[][];
  mock.returns = [] as any[];
  mock.reset = function () {
    mock.calls = [];
    mock.returns = [];
  };
  
  return mock as Mock;
};
