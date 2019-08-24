import Test from '../src/test';

describe('Test', () => {
  it('should run', () => {
    const fn = jest.fn();
    const test = new Test('test', fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(test.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should return isDone', () => {
    const test = new Test('test', () => null);

    expect(test.isDone()).toBeFalsy();
    test.run();
    expect(test.isDone()).toBeTruthy();
  });

  it('should skip', () => {
    const fn = jest.fn();
    const test = new Test('test', fn, true);

    expect(test.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('should error', () => {
    const fn = () => {
      throw new Error('Fatal error');
    };
    const test = new Test('test', fn);

    expect(test.run()).toMatchSnapshot();
  });

  class ExpectError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ExpectError';
    }
  }

  it('should fail', () => {
    const fn = () => {
      throw new ExpectError('Expect failed');
    };
    const test = new Test('test', fn);

    expect(test.run()).toMatchSnapshot();
  });
});
