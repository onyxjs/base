import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { isSuite, rootSymbol } from '../src/suite';
import Test from '../src/test';

describe('Suite', () => {
  it('should run children', () => {
    const child = new Suite('child');
    const spy = jest.spyOn(child, 'run');
    const parent = new Suite('parent');
    parent.addChild(child);

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

  it('should check if is root', () => {
    const suite = new Suite('suite');

    expect(suite.isRoot()).toBeFalsy();

    suite[rootSymbol] = true;
    expect(suite.isRoot()).toBeTruthy();
  });

  it('should push a child to children array', () => {
    const child = new Suite('desc');
    const suite = new Suite('Suite');

    expect(suite.children).toEqual([]);

    suite.addChild(child);
    expect(suite.children.length).toEqual(1);
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
    const child = new PassingRunnable('desc');
    const suite = new Suite('Suite');
    suite.addChild(child);

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
    const child = new FailingRunnable('desc');
    const suite = new Suite('Suite');
    suite.addChild(child);

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

  it('should check if is suite', () => {
    expect(isSuite(null)).toBeFalsy();
    expect(isSuite({})).toBeFalsy();
    expect(isSuite(new Runnable('not a suite'))).toBeFalsy();
    expect(isSuite(new Test('not a suite', () => null))).toBeFalsy();
    expect(isSuite(new Suite('a suite'))).toBeTruthy();
  });

  it('filter children by status', () => {
    const child = new Suite('child');
    const parent = new Suite('parent');
    parent.addChild(child);

    expect(parent.filterChildrenByStatus(Status.Skipped)).toHaveLength(0);
    expect(parent.filterChildrenByStatus(Status.Pending)).toHaveLength(1);

    parent.run();

    expect(parent.filterChildrenByStatus(Status.Passed)).toHaveLength(1);
    expect(parent.filterChildrenByStatus(Status.Pending)).toHaveLength(0);
  });

  it('get state', () => {
    const child = new Suite('child');
    const parent = new Suite('parent');
    parent.addChild(child);

    expect(parent.getState()).toMatchSnapshot();

    parent.run();

    expect(parent.getState()).toMatchSnapshot();
  });

  describe('async', () => { // TODO: check this for races
    it('should pass', async () => {
      const child = new Test('child', () => null);
      const parent = new Suite('parent');
      parent.addChild(child);

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

    it('should fail', async () => {
      const err = new Error('FAIL!');
      const child = new Test('child', () => { throw err; });
      const parent = new Suite('parent');
      parent.addChild(child);

      const start = jest.fn();
      parent.on('start', start);
      const fail = jest.fn();
      parent.on('fail', fail);
      const end = jest.fn();
      parent.on('end', end);

      const fn = jest.fn();
      const promise = parent.asyncRun().catch(fn);

      expect(start).toHaveBeenCalledTimes(1);

      await promise;

      expect(fn).toHaveBeenCalledWith(err);
      expect(fail).toHaveBeenCalledTimes(1);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('should skip', async () => {
      const parent = new Suite('parent', true);

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
  });
});
