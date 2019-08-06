import Runnable from '../src/runnable';
import Test from '../src/test';

describe('Test', () => {
  it('should be an instance of Runnable', () => {
    const fn = jest.fn();
    const test = new Test('Test', fn);

    expect(test).toBeInstanceOf(Runnable);
  });
});
