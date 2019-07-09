import mock from './mock';

const spy = (obj, prop, impl = undefined) => {
  obj[prop] = mock(impl || obj[prop]);
  return obj[prop];
};

export default spy;
