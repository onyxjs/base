const mock = (fn) => {
  const mock = function (...args) {
    mock.calls.push(args);
    return fn(...args);
  };
  mock.calls = [];
  
  return mock;
};

export default mock;
