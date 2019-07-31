const mock = (fn, cb = undefined) => {
  const mock = function (...args) {
    const result = fn(...args);
    if (cb) cb(args, result);
    mock.calls.push(args);
    mock.returns.push(result);
    return result;
  };
  mock.calls = [];
  mock.returns = [];
  mock.reset = function () {
    mock.calls = [];
    mock.returns = [];
  };
  
  return mock;
};

export default mock;
