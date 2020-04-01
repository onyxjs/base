import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite from '../src/suite';
import Test, { isTest } from '../src/test';

describe('Test', () => {
  const defaultOpts = { skip: false, todo: false };
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
    expect(await test.run()).toMatchSnapshot();
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

    expect((await test.run()).status).toBe(Status.Failed);

    expect(start).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should skip', async () => {
    const test = new Test('test', jest.fn(), { skip: true, todo: false}, null);

    expect((await test.run()).status).toBe('skipped');
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

    const result = await test.run({ timeout: 1000 });

    expect(result.status).toBe('failed');
    expect(result.messages[0]).toBe('Test has timed out: 1000ms');
    expect(start).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });
});
