import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Runner, { normalizeRunOptions, RunOptions } from '../src/runner';
import Suite, { rootSymbol } from '../src/suite';
import Test from '../src/test';

const NOOP = jest.fn();

describe('runner', () => {
  it('should normalize passed options', () => {
    expect(normalizeRunOptions()).toMatchObject({
      bail: false,
      sequential: false,
      timeout: 10000,
    });
    expect(normalizeRunOptions({
      bail: true,
      timeout: 1000,
    })).toMatchObject({
      bail: true,
      sequential: false,
      timeout: 1000,
    });
  });

  it('should run a suite and children', () => {
    const rootSuite = new Suite('root', {}, null);
    const childSuite = new Suite('child suite', {}, null);
    const childTest = new Test('child test', NOOP, {}, null);
    const childTestTwo = new Test('child test two', NOOP, {}, null);

    childSuite.addChildren(childTest, childTestTwo);
    rootSuite.addChildren(childSuite);
    rootSuite[rootSymbol] = true;

    const runner = new Runner(rootSuite);

    expect(runner.stats.pending).toBe(2);

    expect(runner.run()).toBe(runner.stats);

    expect(runner.stats.passed).toBe(2);
  });

  // tslint:disable-next-line:max-classes-per-file
  class TimeoutTestRunnable extends Runnable {
    private cb: (options?: RunOptions) => void;

    constructor(
      description: string,
      options: any = {},
      parent: Suite | null,
      cb: (options?: RunOptions) => void | null,
    ) {
      super(description, options, parent);

      this.cb = cb || NOOP;
    }

    public run(options?: RunOptions) {
      if (this.options.skip || this.options.todo) {
        return this.doSkip(this.options.todo);
      }

      this.doStart();

      this.result.addMessages('OK');
      this.result.status = Status.Passed;

      this.cb(options);

      return this.doPass();
    }

    public async asyncRun(options?: RunOptions) {
      if (this.options.skip || this.options.todo) {
        return this.doSkip(this.options.todo);
      }

      this.doStart();

      this.result.addMessages('OK');
      this.result.status = Status.Passed;

      this.cb(options);

      return this.doPass();
    }
  }
  it('should pass run options to children', () => {
    const opts = { bail: true, timeout: 1234, sequential: true };

    const rootSuite = new Suite('root', {}, null);
    const childSuite = new Suite('child', {}, null);
    const cb1 = jest.fn();
    childSuite.addChildren(new TimeoutTestRunnable('1', {}, null, cb1));

    const grandchildSuite = new Suite('grandchild', {}, null);
    const cb2 = jest.fn();
    grandchildSuite.addChildren(new TimeoutTestRunnable('2', {}, null, cb2));
    childSuite.addChildren(grandchildSuite);

    rootSuite.addChildren(childSuite);
    rootSuite[rootSymbol] = true;

    const runner = new Runner(rootSuite, opts);

    runner.run();

    expect(cb1).toHaveBeenCalledWith(opts);
    expect(cb2).toHaveBeenCalledWith(opts);
  });

  describe('async', () => {
    it('should pass run options to children', async () => {
      const opts = { bail: true, timeout: 1234, sequential: true };

      const rootSuite = new Suite('root', {}, null);
      const childSuite = new Suite('child', {}, null);
      const cb1 = jest.fn();
      childSuite.addChildren(new TimeoutTestRunnable('1', {}, null, cb1));

      const grandchildSuite = new Suite('grandchild', {}, null);
      const cb2 = jest.fn();
      grandchildSuite.addChildren(new TimeoutTestRunnable('2', {}, null, cb2));
      childSuite.addChildren(grandchildSuite);

      rootSuite.addChildren(childSuite);
      rootSuite[rootSymbol] = true;

      const runner = new Runner(rootSuite, opts);

      await runner.asyncRun();

      expect(cb1).toHaveBeenCalledWith(opts);
      expect(cb2).toHaveBeenCalledWith(opts);
    });

    it('should run a suite and children', async () => {
      const rootSuite = new Suite('root', {}, null);
      const childSuite = new Suite('child suite', {}, null);
      const childTest = new Test('child test', NOOP, {}, null);
      const childTestTwo = new Test('child test two', NOOP, {}, null);

      childSuite.addChildren(childTest, childTestTwo);
      rootSuite.addChildren(childSuite);
      rootSuite[rootSymbol] = true;

      const runner = new Runner(rootSuite);

      expect(runner.stats.pending).toBe(2);

      expect(await runner.asyncRun()).toBe(runner.stats);

      expect(runner.stats.passed).toBe(2);
    });
  });
});
