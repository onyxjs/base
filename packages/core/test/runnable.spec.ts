import { Status } from '../src/result';
import Runnable from '../src/runnable';
import Suite, { rootSymbol } from '../src/suite';
import Test from '../src/test';

describe('Runnable', () => {
  it('should get full description', () => {
    const parent = new Suite('parent');
    const child = new Runnable('child');
    child.parent = parent;

    expect(child.getFullDescription()).toBe('parent -> child');
  });

  it('should ignore root in full description', () => {
    const parent = new Suite('parent');
    parent[rootSymbol] = true;
    const child = new Runnable('child');
    child.parent = parent;

    expect(child.getFullDescription()).toBe('child');
  });

  it('should run asynchronously', async () => {
    const runnable = new Runnable('runnable');

    expect((await runnable.asyncRun()).status).toBe(Status.Skipped);
  });
});
