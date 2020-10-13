import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { isSuite, rootSymbol } from '../src/suite';
import Test from '../src/test';

describe('Suite', () => {
  const defaultOpts = {
    skip: false,
    todo: false,
  };

  it('should check if is root', () => {
      const suite = new Suite('suite', defaultOpts, null);

      expect(suite.isRoot()).toBeFalsy();

      suite[rootSymbol] = true;
      expect(suite.isRoot()).toBeTruthy();
  });

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
    expect(pass).toHaveBeenCalledTimes(2);
    expect(end).toHaveBeenCalledTimes(2);
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
    expect(start).toHaveBeenCalledTimes(3);
    expect(fail).toHaveBeenCalledTimes(2);
    expect(end).toHaveBeenCalledTimes(3);
  });

  it('should bail out on first failure', async () => {
    jest.useRealTimers();

    const fn = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Shouldn\'t resolve');
        }, 1500);
      });
    };

    const errorFn = () => {
      throw Error();
    };

    // Non-sequential
    const parent = new Suite('parent', defaultOpts, null);
    const firstFail = new Test('firstFail', errorFn, defaultOpts, null);
    const firstPass = new Test('firstPass', fn, defaultOpts, null);
    const secondPass = new Test('secondPass', fn, defaultOpts, null);

    parent.addChildren(firstFail, firstPass, secondPass);

    const parentFail = jest.fn();
    parent.on('fail', parentFail);
    const parentPass = jest.fn();
    parent.on('pass', parentPass);
    const testFail = jest.fn();
    firstFail.on('fail', testFail);
    const testPass = jest.fn();
    firstPass.on('pass', testPass);

    expect((await parent.run({ bail: true, sequential: false })).status).toBe(Status.Failed);
    expect(parent.getStats().done).toBe(1);
    expect(testPass).toHaveBeenCalledTimes(0);
    expect(testFail).toHaveBeenCalledTimes(0);
    expect(parentPass).toHaveBeenCalledTimes(0);
    expect(parentFail).toHaveBeenCalledTimes(2);

    // Sequential
    const sequentialParent = new Suite('sequentialParent', defaultOpts, null);
    const secondFail = new Test('secondFail', errorFn, defaultOpts, null);
    const thirdPass = new Test('thirdPass', fn, defaultOpts, null);
    const fourthPass = new Test('fourthPass', fn, defaultOpts, null);

    const sequentialParentPass = jest.fn();
    sequentialParent.on('pass', sequentialParentPass);
    const sequentialParentFail = jest.fn();
    sequentialParent.on('fail', sequentialParentFail);
    const sequentialTestPass = jest.fn();
    thirdPass.on('pass', sequentialTestPass);
    const sequentialTestFail = jest.fn();
    secondFail.on('fail', sequentialTestFail);

    sequentialParent.addChildren(thirdPass, secondFail, fourthPass);

    expect((await sequentialParent.run({ bail: true, sequential: true })).status).toBe(Status.Failed);
    expect(sequentialParent.getStats().done).toBe(2);
    expect(sequentialTestPass).toHaveBeenCalledTimes(0);
    expect(sequentialTestFail).toHaveBeenCalledTimes(0);
    expect(sequentialParentPass).toHaveBeenCalledTimes(1);
    expect(sequentialParentFail).toHaveBeenCalledTimes(2);
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
