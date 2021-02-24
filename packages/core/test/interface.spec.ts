import {
  afterAll as $afterAll,
  afterEach as $afterEach,
  beforeAll as $beforeAll,
  beforeEach as $beforeEach,
  currentRoot,
  describe as $describe,
  getCurrentRoot,
  it as $it,
  root,
  setCurrentRoot,
} from '../src/interface';
import Suite from '../src/suite';

const noop = () => null;

describe('Interface', () => {
  beforeEach(() => {
    root.children.length = 0; // clean up root to simplify snapshots
  });

  it('should create suites', () => {
    const warn = console.warn;
    console.warn = noop;

    const suite = $describe('test 1', noop);

    expect(suite).toMatchSnapshot();

    console.warn = warn;
  });

  it('should add suites to root', () => {
    const warn = console.warn;
    console.warn = noop;

    $describe('test 2', noop);

    expect(root).toMatchSnapshot();

    console.warn = warn;
  });

  it('should create skipped suites', () => {
    const suite = $describe.skip('test 3', noop);

    expect(suite.options.skip).toBeTruthy();
  });

  it('should create todo suites', () => {
    const suite = $describe.todo('test 3', noop);

    expect(suite.options.todo).toBeTruthy();
  });

  it('should create tests inside of suites', () => {
    const suite = $describe.skip('test 4', () => {
      $it('child 1', noop);
    });

    expect(suite.children[0]).toMatchSnapshot();
    expect(suite.children[0].parent.parent).toBe(root);
  });

  it('should create skipped tests inside of suites', () => {
    const suite = $describe.skip('test 5', () => {
      $it.skip('child 1', noop);
    });

    expect(suite.children[0]).toMatchSnapshot();
  });

  it('should create todo tests inside of suites', () => {
    const suite = $describe.skip('test 5', () => {
      $it.todo('child 1', noop);
    });

    expect(suite.children[0]).toMatchSnapshot();
  });

  it('should update currentRoot', () => {
    expect(currentRoot).toBe(root);

    $describe('root2', () => {
      $it('child 1', noop); // avoid warnings

      expect(currentRoot).not.toBe(root);
      expect(currentRoot.parent).toBe(root);
      expect(currentRoot.getFullDescription()).toBe('root2');
    });

    expect(currentRoot).toBe(root);
  });

  it('should handle nested suites', () => {
    expect(currentRoot).toBe(root);

    $describe('module', () => {
      expect(currentRoot.getFullDescription()).toBe('module');
      $it('test 1', noop);
      $it('test 2', noop);

      $describe('component 1', () => {
        expect(currentRoot.getFullDescription()).toBe('module -> component 1');
        $it('test 1', noop);
        $it('test 2', noop);
      });

      $describe('component 2', () => {
        expect(currentRoot.getFullDescription()).toBe('module -> component 2');
        $it('test 1', noop);
        $it('test 2', noop);

        $describe('method 1', () => {
          expect(currentRoot.getFullDescription()).toBe('module -> component 2 -> method 1');
          $it('test 1', noop);
          $it('test 2', noop);
        });

        $describe('method 2', () => {
          expect(currentRoot.getFullDescription()).toBe('module -> component 2 -> method 2');
          $it('test 1', noop);
          $it('test 2', noop);
        });
      });
    });

    expect(root).toMatchSnapshot();
  });

  it('should throw if it is called without describe context', () => {
    expect(() => $it('test 1', noop)).toThrow('"test 1" "it" should not be called outside of "describe" block');
  });

  it('should warn if no children was created', () => {
    const warn = console.warn;
    console.warn = jest.fn();

    $describe('empty', noop);
    expect(console.warn).toHaveBeenCalledWith(`suite "empty" doesn't have any child tests or suites.`);

    console.warn = warn;
  });

  it('should get and set current root', () => {
    expect(getCurrentRoot()).toBe(root);

    setCurrentRoot({} as Suite);
    expect(getCurrentRoot()).toBe(root);

    setCurrentRoot(new Suite('new root', { skip: false, todo: false }, null));
    expect(getCurrentRoot().description).toBe('new root');

    setCurrentRoot(root);
    expect(getCurrentRoot()).toBe(root);
  });

  it('should add hooks to current suite', () => {
    $describe('root', () => {
      $beforeAll(() => null);
      $afterEach(() => null);
      $describe('child', () => {
        $it('test', () => null);

        $beforeAll(() => null);
        $beforeAll(() => undefined);
        $beforeEach(() => null);
        $afterEach(async () => null);
        $afterAll(() => null);

        expect(currentRoot.hooks).toMatchSnapshot();
      });
      expect(currentRoot.hooks).toMatchSnapshot();
    });
  });
});
