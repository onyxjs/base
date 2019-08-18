import Runnable from '../src/runnable';
import Suite from '../src/suite';

describe('Runnable', () => {
  it('should get full description', () => {
    const parent = new Suite('parent');
    const child = new Runnable('child');
    child.parent = parent;

    expect(child.getFullDescription()).toBe('parent child');
  })
});
