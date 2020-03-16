import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite from '../src/suite';
import Test, { isTest } from '../src/test';

describe('Test', () => {
  const defaultOpts = { skip: false, todo: false };

  it('should run', () => {
    const fn = jest.fn();
    const test = new Test('test', fn, defaultOpts, null);

    const start = jest.fn();
    test.on('start', start);
    const pass = jest.fn();
    test.on('pass', pass);
    const end = jest.fn();
    test.on('end', end);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(test.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(1);

    expect(start).toHaveBeenCalledTimes(1);
    expect(pass).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
    expect(test.time).toBeGreaterThan(0);
  });

  it('should return isDone', () => {
    const fn = jest.fn();
    const test = new Test('test', fn, defaultOpts, null);

    expect(test.isDone()).toBeFalsy();
    test.run();
    expect(test.isDone()).toBeTruthy();
  });

  it('should skip', () => {
    const opts = { skip: true, todo: false };
    const fn = jest.fn();
    const test = new Test('test', fn, opts, null);

    const start = jest.fn();
    test.on('start', start);
    const skip = jest.fn();
    test.on('skip', skip);
    const end = jest.fn();
    test.on('end', end);

    expect(test.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(0);

    expect(start).not.toHaveBeenCalled();
    expect(skip).toHaveBeenCalledTimes(1);
    expect(skip).toHaveBeenCalledWith(test, false);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should skip', () => {
    const opts = { skip: false, todo: true };
    const fn = jest.fn();
    const test = new Test('test', fn, opts, null);

    const start = jest.fn();
    test.on('start', start);
    const skip = jest.fn();
    test.on('skip', skip);
    const end = jest.fn();
    test.on('end', end);

    expect(test.run()).toMatchSnapshot();
    expect(fn).toHaveBeenCalledTimes(0);

    expect(start).not.toHaveBeenCalled();
    expect(skip).toHaveBeenCalledTimes(1);
    expect(skip).toHaveBeenCalledWith(test, true);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should fail', () => {
    const fn = () => {
      throw new Error('Fatal error');
    };
    const test = new Test('test', fn, defaultOpts, null);

    const start = jest.fn();
    test.on('start', start);
    const fail = jest.fn();
    test.on('fail', fail);
    const end = jest.fn();
    test.on('end', end);

    expect(test.run()).toMatchSnapshot();

    expect(start).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should check if is test', () => {
    const fn = jest.fn();

    expect(isTest(null)).toBeFalsy();
    expect(isTest({})).toBeFalsy();
    expect(isTest(new Runnable('not a test', defaultOpts, null))).toBeFalsy();
    expect(isTest(new Suite('not a test', defaultOpts, null))).toBeFalsy();
    expect(isTest(new Test('a test', fn, defaultOpts, null))).toBeTruthy();
  });

  describe('async', () => {
    it('should run', async () => {
      const fn = jest.fn();
      const test = new Test('test', fn, defaultOpts, null);

      const start = jest.fn();
      test.on('start', start);
      const pass = jest.fn();
      test.on('pass', pass);
      const end = jest.fn();
      test.on('end', end);

      expect(fn).toHaveBeenCalledTimes(0);
      expect(await test.asyncRun()).toMatchSnapshot();
      expect(fn).toHaveBeenCalledTimes(1);

      expect(start).toHaveBeenCalledTimes(1);
      expect(pass).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('should fail', async () => {
      const err = new Error('Fatal error');
      const fn = () => {
        throw err;
      };
      const test = new Test('test', fn, defaultOpts, null);

      const start = jest.fn();
      test.on('start', start);
      const fail = jest.fn();
      test.on('fail', fail);
      const end = jest.fn();
      test.on('end', end);

      expect((await test.asyncRun()).status).toBe(Status.Failed);

      expect(start).toHaveBeenCalledTimes(1);
      expect(fail).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('should skip', async () => {
      const test = new Test('test', jest.fn(), { skip: true, todo: false}, null);

      expect((await test.asyncRun()).status).toBe('skipped');
    });

    it('should timeout', async () => {
      jest.useRealTimers();
      const fn = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('Shouldn\'t resolve');
          }, 1001);
        });
      };

      const test = new Test('test', fn, defaultOpts, null);

      const start = jest.fn();
      test.on('start', start);
      const fail = jest.fn();
      test.on('fail', fail);
      const end = jest.fn();
      test.on('end', end);

      const result = await test.asyncRun({ timeout: 1000 });

      expect(result.status).toBe('failed');
      expect(result.messages[0]).toBe('Test has timed out: 1000ms');
      expect(start).toHaveBeenCalledTimes(1);
      expect(fail).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });
  });
});
