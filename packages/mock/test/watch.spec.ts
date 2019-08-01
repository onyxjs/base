import watch from '../src/watch';

describe('Watch', () => {
  it('should watch the getter of object property', () => {
    let obj = {
      a: 'foo',
      b: 'baz',
    };
    const get = jest.fn();
    obj = watch(obj, ['a'], get, undefined) as { a: string, b: string };

    expect(get).toHaveBeenCalledTimes(0);

    // tslint:disable-next-line:no-unused-expression
    obj.a;
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith('foo');

    // tslint:disable-next-line:no-unused-expression
    obj.b; // Shouldn't trigger on other props' get
    expect(get).toHaveBeenCalledTimes(1);
  });

  it('should watch the setter of object property', () => {
    let obj = {
      a: 'foo',
      b: 'baz',
    };
    const set = jest.fn();
    obj = watch(obj, ['a'], undefined, set) as { a: string, b: string };

    expect(set).toHaveBeenCalledTimes(0);
    obj.a = 'bar';
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith('bar');

    obj.b = 'qux'; // Shouldn't trigger on other props' set
    expect(set).toHaveBeenCalledTimes(1);
  });
});
