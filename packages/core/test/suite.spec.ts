import Result, {Status} from '../src/result';
import Runnable from '../src/runnable';
import Suite from '../src/suite';

describe('Suite', () => {
  it('to be an instance of Runnable', () => {
    const fn = jest.fn();
    const suite = new Suite('Suite', fn, false);

    expect(suite).toBeInstanceOf(Runnable);
    expect(suite.run()).toBeInstanceOf(Result);
  });
  it('to have the type set to `Suite`', () => {
    const suite = new Suite('Suite', () => null, false);

    expect(suite).toHaveProperty('type');
    expect(suite.type).toBe('Suite');
  });
  it('to have a description', () => {
    const suite = new Suite('Suite', () => null, false);

    expect(suite).toHaveProperty('description');
    expect(suite.description).toBe('Suite');
  });
  it('to skip', () => {
    const fn = jest.fn();
    const suite = new Suite('Suite', fn, true);

    expect(suite.skip).toBeTruthy();
    expect(suite.run()).toEqual(new Result(Status.Skipped, []));
  });
});
