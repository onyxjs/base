import Result, { Status } from '../src/result';

describe('Result', () => {
  it('should change status', () => {
    const result = new Result();

    expect(result.status).toBe(Status.Pending);
    result.status = Status.Passed;
    expect(result.status).toBe(Status.Passed);
  });

  it('should set isDone', () => {
    const result = new Result();

    expect(result.isDone()).toBeFalsy();
    result.status = Status.Passed;
    expect(result.isDone()).toBeTruthy();
  });

  it('should work with messages', () => {
    const result = new Result(Status.Pending, 'Result');

    expect(result.messages).toHaveLength(1);
    result.addMessages('Test', 'Onyx');
    expect(result.messages).toHaveLength(3);
  });

  it('should lock up when done', () => {
    const result = new Result();

    result.addMessages('Test', 'Onyx');
    expect(result.messages).toHaveLength(2);

    result.status = Status.Passed;

    result.addMessages('Test', 'Onyx');
    expect(result.messages).toHaveLength(2);

    result.status = Status.Pending;
    expect(result.status).toBe(Status.Passed)
  });
});
