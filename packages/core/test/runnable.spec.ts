import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { rootSymbol } from '../src/suite';

describe('Runnable', () => {
  const defaultOpts = { skip: false, todo: false };

  it('should get full description', () => {
    const parent = new Suite('parent');
    const child = new Runnable('child', defaultOpts, parent);

    expect(child.getFullDescription()).toBe('parent -> child');
  });

  it('should ignore root in full description', () => {
    const parent = new Suite('parent');
    parent[rootSymbol] = true;
    const child = new Runnable('child', defaultOpts, parent);

    expect(child.getFullDescription()).toBe('child');
  });

  it('should run asynchronously', async () => {
    const runnable = new Runnable('runnable', defaultOpts, null);

    expect((await runnable.asyncRun()).status).toBe(Status.Skipped);
  });

  describe('events', () => {
    it('start', () => {
      const runnable = new Runnable('runnable', defaultOpts, null);

      const fn = jest.fn();
      runnable.on('start', fn);

      runnable.doStart();
      expect(runnable.result.status).toBe(Status.Running);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('pass', () => {
      const runnable = new Runnable('runnable', defaultOpts, null);
      const fn = jest.fn();
      runnable.on('pass', fn);

      const end = jest.fn();
      runnable.on('end', end);

      runnable.doPass();
      expect(runnable.result.status).toBe(Status.Passed);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('fail', () => {
      const runnable = new Runnable('runnable', defaultOpts, null);
      const fn = jest.fn();
      runnable.on('fail', fn);

      const end = jest.fn();
      runnable.on('end', end);

      runnable.doFail();
      expect(runnable.result.status).toBe(Status.Failed);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('skip', () => {
      const runnable = new Runnable('runnable', defaultOpts, null);
      const fn = jest.fn();
      runnable.on('skip', fn);

      const end = jest.fn();
      runnable.on('end', end);
      const skip = jest.fn();
      runnable.on('skip', skip);

      runnable.doSkip();
      expect(runnable.result.status).toBe(Status.Skipped);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
      expect(skip).toHaveBeenCalledWith(runnable, false);
      expect(runnable.time).toBe(0);
    });

    it('skip(todo)', () => {
      const runnable = new Runnable('runnable', defaultOpts, null);
      const fn = jest.fn();
      runnable.on('skip', fn);

      const end = jest.fn();
      runnable.on('end', end);
      const skip = jest.fn();
      runnable.on('skip', skip);

      runnable.doSkip(true);
      expect(runnable.result.status).toBe(Status.Todo);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
      expect(skip).toHaveBeenCalledWith(runnable, true);
      expect(runnable.time).toBe(0);
    });

    it('end', () => {
      const runnable = new Runnable('runnable', defaultOpts, null);
      const end = jest.fn();
      runnable.on('end', end);

      runnable.doEnd();
      expect(end).toHaveBeenCalledTimes(1);
    });
  });
});
