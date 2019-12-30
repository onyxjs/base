import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { rootSymbol } from '../src/suite';
import Test, { isTest } from '../src/test';

describe('Runnable', () => {
  it('should get full description', () => {
    const parent = new Suite('parent');
    const child = new Runnable('child');
    child.parent = parent;

    expect(child.getFullDescription()).toBe('parent -> child');
  });

  it('should ignore root in full description', () => {
    const parent = new Suite('parent');
    parent[rootSymbol] = true;
    const child = new Runnable('child');
    child.parent = parent;

    expect(child.getFullDescription()).toBe('child');
  });

  it('should run asynchronously', async () => {
    const runnable = new Runnable('runnable');

    expect((await runnable.asyncRun()).status).toBe(Status.Skipped);
  });

  describe('events', () => {
    it('start', () => {
      const runnable = new Runnable('runnable');

      const fn = jest.fn();
      runnable.on('start', fn);

      runnable.doStart();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('pass', () => {
      const runnable = new Runnable('runnable');
      const fn = jest.fn();
      runnable.on('pass', fn);

      const end = jest.fn();
      runnable.on('end', end);

      runnable.doPass();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('fail', () => {
      const runnable = new Runnable('runnable');
      const fn = jest.fn();
      runnable.on('fail', fn);

      const end = jest.fn();
      runnable.on('end', end);

      runnable.doFail();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('skip', () => {
      const runnable = new Runnable('runnable');
      const fn = jest.fn();
      runnable.on('skip', fn);

      const end = jest.fn();
      runnable.on('end', end);

      runnable.doSkip();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('end', () => {
      const runnable = new Runnable('runnable');
      const end = jest.fn();
      runnable.on('end', end);

      runnable.doEnd();
      expect(end).toHaveBeenCalledTimes(1);
    });
  });
});
