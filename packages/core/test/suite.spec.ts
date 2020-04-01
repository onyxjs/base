import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { isSuite, rootSymbol } from '../src/suite';
import Test from '../src/test';

describe('Suite', () => {
  const defaultOpts = {
    skip: false,
    todo: false,
  };

  // tslint:disable-next-line:max-classes-per-file
  class FailingRunnable extends Runnable {
    public async run() {
      this.result.addMessages('FAIL!');
      this.result.status = Status.Failed;
      return this.result;
    }
  }

  // tslint:disable-next-line:max-classes-per-file
  class PassingRunnable extends Runnable {
    public async run() {
      this.result.addMessages('OK');
      this.result.status = Status.Passed;
      return this.result;
    }
  }

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

    const promise = parent.run();

    expect(start).toHaveBeenCalledTimes(1);

    expect((await promise).status).toBe(Status.Passed);
    expect(pass).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should run sequentially', async () => {
    const suite = new Suite('Suite', defaultOpts, null);
    const child = new PassingRunnable('desc', defaultOpts, suite);
    const child1 = new PassingRunnable('desc', defaultOpts, suite);
    const child2 = new PassingRunnable('desc', defaultOpts, suite);
    const child3 = new PassingRunnable('desc', defaultOpts, suite);
    const child4 = new PassingRunnable('desc', defaultOpts, suite);
    suite.addChildren(child, child1, child2, child3, child4);

    await suite.run({ sequential: true });
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

    expect((await parent.run()).status).toBe(Status.Failed);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(start).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });

  it('should bail out on 1 or `n` failures', async () => {
    jest.useRealTimers();

    const err = new Error('FAIL!');
    const parent = new Suite('parent', defaultOpts, null);
    const parent2 = new Suite('parent2', defaultOpts, null);
    const parent3 = new Suite('parent3', defaultOpts, null);
    const parent4 = new Suite('parent3', defaultOpts, null);

    const fn = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Shouldn\'t resolve');
        }, 1500);
      });
    };

    const errorFn = () => {
      return new Promise((reject) => {
        setTimeout(() => {
          reject('Rejected promise');
        }, 150);
      });
    };

    const start = jest.fn();
    parent.on('start', start);
    const end = jest.fn();
    parent.on('end', end);
    const fail = jest.fn();
    parent.on('fail', fail);

    const failingChild = new Test('fail', () => { throw err; }, defaultOpts, null);
    const failingChild2 = new Test('fail 2', errorFn, defaultOpts, null);
    const passingChild = new Test('pass', fn, defaultOpts, null);

    parent.addChildren(failingChild, failingChild, passingChild, passingChild, passingChild, passingChild);
    parent2.addChildren(failingChild, passingChild, passingChild, failingChild2, passingChild, passingChild);
    parent3.addChildren(failingChild, passingChild, passingChild, failingChild2, passingChild, passingChild);
    parent4.addChildren(failingChild, failingChild2, failingChild, passingChild, passingChild, passingChild);

    expect((await parent.run({ bail: 2, sequential: true })).status).toBe(Status.Failed);
    expect(parent.getStats().done).toBe(2);
    expect(start).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);

    expect((await parent2.run({ bail: true })).status).toBe(Status.Failed);
    expect(parent2.getStats().done).toBe(1);
    expect(start).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);

    expect((await parent3.run({ bail: true, sequential: true })).status).toBe(Status.Failed);
    expect(parent3.getStats().done).toBe(1);
    expect(start).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);

    expect((await parent4.run({ bail: 2 })).status).toBe(Status.Failed);
    expect(parent4.getStats().done).toBe(2);
    expect(start).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
    expect(fail).toHaveBeenCalledTimes(1);
  });

  it('should skip', async () => {
    const parent = new Suite('parent', { skip: true }, null);

    const start = jest.fn();
    parent.on('start', start);
    const skip = jest.fn();
    parent.on('skip', skip);
    const end = jest.fn();
    parent.on('end', end);

    const promise = parent.run();

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
      await parent.run();
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
