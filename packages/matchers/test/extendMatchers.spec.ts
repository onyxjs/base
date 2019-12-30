import $expect from '../src/expect';
import { extendMatchers } from '../src/matchers';

describe('extendMatchers', () => {
  it('should add custom matchers', () => {
    extendMatchers({
      toBePrice(v: string) {
        return v.startsWith('$');
      },
    });

    expect(() => ($expect(1) as any).toBePrice()).toThrow();
    expect(() => ($expect('$1') as any).toBePrice()).not.toThrow();
  });
});
