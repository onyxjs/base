import Runnable from '../src/runnable';
import Suite from '../src/suite';
import Test, { isTest } from '../src/test';

describe('Test', () => {
  it('should run', () => {
    const fn = jest.fn();
    const test = new Test('test', fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(test.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should run asynchronously', async () => {
    const fn = jest.fn();
    const test = new Test('test', fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(await test.asyncRun()).toMatchSnapshot();
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

  it('should fail', () => {
    const fn = () => {
      throw new Error('Fatal error');
    };
    const test = new Test('test', fn);

    expect(test.run()).toMatchSnapshot();
  });

  it('should fail in async', async () => {
    const err = new Error('Fatal error');
    const fn = () => {
      throw err;
    };
    const test = new Test('test', fn);

    const spy = jest.fn();
    await test.asyncRun().catch(spy);

    expect(spy).toHaveBeenCalledWith(err);
  });

  it('should check if is test', () => {
    expect(isTest(null)).toBeFalsy();
    expect(isTest({})).toBeFalsy();
    expect(isTest(new Runnable('not a test'))).toBeFalsy();
    expect(isTest(new Suite('not a test'))).toBeFalsy();
    expect(isTest(new Test('a test', () => null))).toBeTruthy();
  });
});
