import Result, {Status} from '../src/result';
import Runnable from '../src/runnable';
import Suite from '../src/suite';

describe('Suite', () => {
  it('should be an instance of Runnable', () => {
    const fn = jest.fn();
    const suite = new Suite('Suite', fn);

    expect(suite).toBeInstanceOf(Runnable);
    expect(suite.run()).toBeInstanceOf(Result);
    expect(suite.asyncRun()).toBeInstanceOf(Promise);
    expect(suite.skip).toBeFalsy();
    expect(suite).toHaveProperty('description');
    expect(suite).toHaveProperty('fn');
    expect(suite).toHaveProperty('result');
  });
  it('should be type `Suite`', () => {
    const suite = new Suite('Suite', () => null);

    expect(suite).toHaveProperty('type');
    expect(suite.type).toBe('Suite');
  });
  it('should skip', () => {
    const fn = jest.fn();
    const suite = new Suite('Suite', fn);

    expect(suite.skip = true).toBeTruthy();
    expect(suite.run()).toEqual(new Result(Status.Skipped, []));
  });
  it('should error', () => {
    const fn = () => {
      throw new Error('Error');
    };
    const suite = new Suite('Suite', fn);

    expect(suite.run()).toEqual(new Result(Status.Errored, [ 'Error: Error' ]));
  });

  class ExpectError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ExpectError';
    }
  }

  it('should fail', () => {
    const fn = () => {
      throw new ExpectError('Expect failed');
    };
    const suite = new Suite('Suite', fn);

    expect(suite.run()).toEqual(new Result(Status.Failed, [ 'ExpectError: Expect failed']));
  });
  it('should run asynchronously', async () => {
    const fn = jest.fn();
    const suite = new Suite('test', fn);

    await expect(suite.asyncRun()).resolves.toBeInstanceOf(Result);
  });
});
