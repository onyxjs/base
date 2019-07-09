import mock from './mock';

const spy = (obj, prop) => {
  obj[prop] = mock(obj[prop]);
  return obj[prop];
};

export default spy;
