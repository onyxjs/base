import Result, {Status} from '../src/result';
import Runnable from '../src/runnable';
import Suite from '../src/suite';

describe('Suite', () => {
  it('should return a full description', () => {
    const fn = jest.fn();
    const child = new Suite('child', fn);
    const parent = new Suite('parent', fn);

    child.parent = parent;

    expect(child.getFullDesc()).toBe('parent child');
  });

  it('should push a child to children array', () => {
    const fn = jest.fn();
    const child = new Runnable('desc', fn);
    const suite = new Suite('Suite', fn);

    expect(suite.children).toEqual([]);

    suite.addChild(child);
    expect(suite.children.length).toEqual(1);
  });
});
