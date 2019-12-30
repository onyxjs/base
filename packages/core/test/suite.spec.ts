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
    parent.run();

    expect(spy).toHaveBeenCalled();
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
    suite.run();

    expect(suite.result).toMatchSnapshot();
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
    suite.run();

    expect(suite.result).toMatchSnapshot();
  });

  it('should check if is suite', () => {
    expect(isSuite(null)).toBeFalsy();
    expect(isSuite({})).toBeFalsy();
    expect(isSuite(new Runnable('not a suite'))).toBeFalsy();
    expect(isSuite(new Test('not a suite', () => null))).toBeFalsy();
    expect(isSuite(new Suite('a suite'))).toBeTruthy();
  });
});
