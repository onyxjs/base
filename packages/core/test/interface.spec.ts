import $describe, { root } from '../src/interface';

describe('Interface', () => {
  it('should create suites', () => {
    const suite = $describe('test 1', () => null);

    expect(suite).toMatchSnapshot();
  });

  it('should add suites to root', () => {
    $describe('test 2', () => null);

    expect(root).toMatchSnapshot();
  });

  it('should create skipped suites', () => {
    const suite = $describe.skip('test 3', () => null);

    expect(suite.skip).toBeTruthy();
  });

  it('should create tests inside of suites', () => {
    const suite = $describe.skip('test 4', ($it) => {
      $it('child 1', () => null);
    });

    expect(suite.children[0]).toMatchSnapshot();
  });

  it('should create skipped tests inside of suites', () => {
    const suite = $describe.skip('test 5', ($it) => {
      $it.skip('child 1', () => null);
    });

    expect(suite.children[0]).toMatchSnapshot();
  });
});
