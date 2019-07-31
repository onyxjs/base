import mock from './mock';

const spy = (obj, prop, cb = undefined, impl = undefined) => {
  obj[prop] = mock(impl || obj[prop], cb);
  return obj[prop];
};

export default spy;
