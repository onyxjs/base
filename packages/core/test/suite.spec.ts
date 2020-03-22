import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { isSuite, rootSymbol } from '../src/suite';
import Test from '../src/test';

describe('Suite', () => {
  const defaultOpts = {
    skip: false,
    todo: false,
  };

  it('should run children', () => {
    const parent = new Suite('parent', defaultOpts, null);
    const child = new Suite('child', defaultOpts, parent);
    const spy = jest.spyOn(child, 'run');
    parent.addChildren(child);

    const start = jest.fn();
    parent.on('start', start);
    const pass = jest.fn();
    parent.on('pass', pass);
    const end = jest.fn();
    parent.on('end', end);
    parent.run();

    expect(spy).toHaveBeenCalled();

    expect(start).toHaveBeenCalledTimes(1);
    expect(pass).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should skip', () => {
    const suite = new Suite('parent', { skip: true }, null);

    const start = jest.fn();
    suite.on('start', start);
    const skip = jest.fn();
    suite.on('skip', skip);
    const end = jest.fn();
    suite.on('end', end);
    suite.run();

    expect(start).toHaveBeenCalledTimes(0);
    expect(skip).toHaveBeenCalledTimes(1);
    expect(skip).toHaveBeenCalledWith(suite, false);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should work with todo option', () => {
    const suite = new Suite('parent', { todo: true }, null);

    const start = jest.fn();
    suite.on('start', start);
    const skip = jest.fn();
    suite.on('skip', skip);
    const end = jest.fn();
    suite.on('end', end);
    suite.run();

    expect(start).toHaveBeenCalledTimes(0);
    expect(skip).toHaveBeenCalledTimes(1);
    expect(skip).toHaveBeenCalledWith(suite, true);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should check if is root', () => {
    const suite = new Suite('suite', defaultOpts, null);

    expect(suite.isRoot()).toBeFalsy();

    suite[rootSymbol] = true;
    expect(suite.isRoot()).toBeTruthy();
  });

  it('should push children to children array', () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child1 = new Suite('desc', defaultOpts, suite);
    const child2 = new Suite('desc', defaultOpts, suite);

    expect(suite.children).toEqual([]);

    suite.addChildren(child1, child2);
    expect(suite.children.length).toEqual(2);
  });

  // tslint:disable-next-line:max-classes-per-file
  class PassingRunnable extends Runnable {
    public run() {
      this.result.addMessages('OK');
      this.result.status = Status.Passed;
      return this.result;
    }
  }
  it('should pass and collect messages', () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child = new PassingRunnable('desc', defaultOpts, null);
    suite.addChildren(child);

    const start = jest.fn();
    suite.on('start', start);
    const pass = jest.fn();
    suite.on('pass', pass);
    const end = jest.fn();
    suite.on('end', end);
    suite.run();

    expect(suite.result).toMatchSnapshot();

    expect(start).toHaveBeenCalledTimes(1);
    expect(pass).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  // tslint:disable-next-line:max-classes-per-file
  class FailingRunnable extends Runnable {
    public run() {
      this.result.addMessages('FAIL!');
      this.result.status = Status.Failed;
      return this.result;
    }
  }
  it('should fail and collect messages', () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child = new FailingRunnable('desc', defaultOpts, suite);
    suite.addChildren(child);

    const start = jest.fn();
    suite.on('start', start);
    const fail = jest.fn();
    suite.on('fail', fail);
    const end = jest.fn();
    suite.on('end', end);
    suite.run();

    expect(suite.result).toMatchSnapshot();

    expect(start).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should not bail out', () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child1 = new FailingRunnable('desc', defaultOpts, suite);
    const child2 = new PassingRunnable('desc', defaultOpts, suite);
    suite.addChildren(child1, child2);

    suite.run();
    expect(suite.getStats().done).toBe(2);
  });

  it('should bail out when bail is set to true', () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child1 = new FailingRunnable('desc', defaultOpts, suite);
    const child2 = new PassingRunnable('desc', defaultOpts, suite);
    suite.addChildren(child1, child2);

    suite.run({ bail: true });
    expect(suite.getStats().done).toBe(1);
  });

  it('should bail out after n tests when bail is a number', () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child = new PassingRunnable('desc', defaultOpts, suite);
    const child1 = new FailingRunnable('desc', defaultOpts, suite);
    const child2 = new FailingRunnable('desc', defaultOpts, suite);
    const child3 = new FailingRunnable('desc', defaultOpts, suite);
    const child4 = new PassingRunnable('desc', defaultOpts, suite);
    suite.addChildren(child, child1, child2, child3, child4);

    suite.run({ bail: 2 });
    expect(suite.getStats().done).toBe(3);
  });

  it('should check if is suite', () => {
    expect(isSuite(null)).toBeFalsy();
    expect(isSuite({})).toBeFalsy();
    expect(isSuite(new Runnable('not a suite', defaultOpts, null))).toBeFalsy();
    expect(isSuite(new Test('not a suite', jest.fn(), defaultOpts, null))).toBeFalsy();
    expect(isSuite(new Suite('a suite', defaultOpts, null))).toBeTruthy();
  });

  it('should collect stats', () => {
    const passing = new Suite('passing', defaultOpts, null);
    passing.addChildren(
      new PassingRunnable('passing runnable', defaultOpts, null),
    );
    const skipped = new Suite('skipped', { skip: true }, null);
    const todo = new Suite('todo', { todo: true }, null);
    const failing = new Test('failing', () => {
      throw new Error('FAIL!');
    }, defaultOpts, null);
    const parent = new Suite('parent', defaultOpts, null);
    parent.addChildren(passing, skipped, todo, failing);

    expect(parent.getStats()).toMatchSnapshot({
      time: expect.any(Number),
    });

    parent.run();

    expect(parent.getStats()).toMatchSnapshot({
      time: expect.any(Number),
    });
  });

  it('should invoke hooks', () => {
    const error = console.error;
    console.error = jest.fn();

    const parent = new Suite('parent', {}, null);
    parent.addChildren(
      new Test('passing', jest.fn(), {}, parent),
      new Test('failing', () => { throw new Error('Fail'); }, {}, parent),
    );
    const calls: string[] = [];

    parent.hooks.beforeAll.push(
      () => calls.push('beforeAll1'),
      () => calls.push('beforeAll2'),
    );
    parent.hooks.beforeEach.push(
      () => calls.push('beforeEach1'),
      () => calls.push('beforeEach2'),
      () => { throw new Error('beforeEach hook error'); },
    );
    parent.hooks.afterEach.push(
      () => calls.push('afterEach1'),
      () => calls.push('afterEach2'),
    );
    parent.hooks.afterAll.push(
      () => calls.push('afterAll1'),
      () => calls.push('afterAll2'),
      () => { throw new Error('afterAll hook error'); },
    );

    parent.run();
    expect(calls).toMatchSnapshot();

    expect(console.error).toHaveBeenCalledTimes(3);
    expect(console.error).toHaveBeenCalledWith('Error in beforeEach hook: Error: beforeEach hook error');
    expect(console.error).toHaveBeenCalledWith('Error in afterAll hook: Error: afterAll hook error');

    console.error = error;
  });

  describe('async', () => { // TODO: check this for races
    it('should pass', async () => {
      const child = new Test('child', jest.fn(), defaultOpts, null);
      const parent = new Suite('parent', defaultOpts, null);
      parent.addChildren(child);

      const start = jest.fn();
      parent.on('start', start);
      const pass = jest.fn();
      parent.on('pass', pass);
      const end = jest.fn();
      parent.on('end', end);

      const promise = parent.asyncRun();

      expect(start).toHaveBeenCalledTimes(1);

      expect((await promise).status).toBe(Status.Passed);
      expect(pass).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('should run sequentially', () => {
      const suite = new Suite('Suite', defaultOpts, null);
      const child = new PassingRunnable('desc', defaultOpts, suite);
      const child1 = new PassingRunnable('desc', defaultOpts, suite);
      const child2 = new PassingRunnable('desc', defaultOpts, suite);
      const child3 = new PassingRunnable('desc', defaultOpts, suite);
      const child4 = new PassingRunnable('desc', defaultOpts, suite);
      suite.addChildren(child, child1, child2, child3, child4);

      suite.run({ sequential: true });
      expect(suite.getStats().done).toBe(5);
    });

    it('should fail', async () => {
      const fn = jest.fn();

      const err = new Error('FAIL!');
      const child = new Test('child 1', () => { throw err; }, defaultOpts, null);
      const passingChild = new Test('child 2', fn, defaultOpts, null);
      const parent = new Suite('parent', defaultOpts, null);
      parent.addChildren(child);
      parent.addChildren(passingChild);

      const start = jest.fn();
      parent.on('start', start);
      const fail = jest.fn();
      parent.on('fail', fail);
      const end = jest.fn();
      parent.on('end', end);

      expect((await parent.asyncRun()).status).toBe(Status.Failed);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(start).toHaveBeenCalledTimes(1);
      expect(fail).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('should bail out', async () => {
      jest.useRealTimers();

      const err = new Error('FAIL!');
      const parent = new Suite('parent', defaultOpts, null);
      const parent2 = new Suite('parent2', defaultOpts, null);
      const fn = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('Shouldn\'t resolve');
          }, 1001);
        });
      };

      const start = jest.fn();
      parent.on('start', start);
      const skip = jest.fn();
      parent.on('skip', skip);
      const end = jest.fn();
      parent.on('end', end);

      const failingChild = new Test('fail', () => { throw err; }, defaultOpts, null);
      const passingChild = new Test('pass', fn, defaultOpts, null);

      parent.addChildren(failingChild, failingChild, passingChild, passingChild, passingChild, passingChild);
      parent2.addChildren(failingChild, failingChild, passingChild, passingChild, passingChild, passingChild);

      expect((await parent.asyncRun({ bail: 2, sequential: true })).status).toBe(Status.Failed);
      expect(parent.getStats().done).toBe(2);
      expect((await parent2.asyncRun({ bail: 2 })).status).toBe(Status.Failed);
      expect(parent2.getStats().done).toBe(2);
    });

    it('should skip', async () => {
      const parent = new Suite('parent', { skip: true }, null);

      const start = jest.fn();
      parent.on('start', start);
      const skip = jest.fn();
      parent.on('skip', skip);
      const end = jest.fn();
      parent.on('end', end);

      const promise = parent.asyncRun();

      expect(skip).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
      expect((await promise).status).toBe(Status.Skipped);
    });

    it('should invoke hooks', async () => {
      const error = console.error;
      console.error = jest.fn();

      const parent = new Suite('parent', {}, null);
      parent.addChildren(
        new Test('passing', jest.fn(), {}, parent),
        new Test('failing', () => { throw new Error('Fail'); }, {}, parent),
      );
      const calls: string[] = [];

      parent.hooks.beforeAll.push(
        () => calls.push('beforeAll1'),
        () => calls.push('beforeAll2'),
      );
      parent.hooks.beforeEach.push(
        async () => await calls.push('beforeEach1'),
        () => calls.push('beforeEach2'),
        () => { throw new Error('beforeEach hook error'); },
      );
      parent.hooks.afterEach.push(
        () => calls.push('afterEach1'),
        () => calls.push('afterEach2'),
      );
      parent.hooks.afterAll.push(
        () => calls.push('afterAll1'),
        async () => await calls.push('afterAll2'),
        async () => { throw new Error('afterAll hook error'); },
      );

      try {
        await parent.asyncRun();
      } catch {
        // noop
      }
      expect(calls).toMatchSnapshot();

      expect(console.error).toHaveBeenCalledTimes(3);
      expect(console.error).toHaveBeenCalledWith('Error in beforeEach hook: Error: beforeEach hook error');
      expect(console.error).toHaveBeenCalledWith('Error in afterAll hook: Error: afterAll hook error');

      console.error = error;
    });
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
