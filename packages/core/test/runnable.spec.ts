import Runnable from '../src/runnable';

describe('Runnable', () => {
  it('should run', () => {
    const fn = jest.fn();
    const runnable = new Runnable('test', fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(runnable.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should return isDone', () => {
    const runnable = new Runnable('test', () => null);

    expect(runnable.isDone()).toBeFalsy();
    runnable.run();
    expect(runnable.isDone()).toBeTruthy();
  });

  it('should skip', () => {
    const fn = jest.fn();
    const runnable = new Runnable('test', fn, true);

    expect(runnable.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('should error', () => {
    const fn = () => {
      throw new Error('Fatal error');
    };
    const runnable = new Runnable('test', fn);

    expect(runnable.run()).toMatchSnapshot();
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
    const runnable = new Runnable('test', fn);

    expect(runnable.run()).toMatchSnapshot();
  });

  it('should run asynchronously', async () => {
    const fn = jest.fn();
    const runnable = new Runnable('test', fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(await runnable.asyncRun()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
