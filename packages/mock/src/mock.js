const mock = (fn) => {
  const mock = function (...args) {
    mock.calls.push(args);
    const result = fn(...args);
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
