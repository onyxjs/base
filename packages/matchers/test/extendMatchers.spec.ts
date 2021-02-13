import $expect from '../src/expect';
import { extendMatchers } from '../src/matchers';

declare module '../src/matchers' {
  namespace onyx {
    export interface MockMatchers {
      toBePrice: (a: any) => boolean; // Type extension that makes our matchers visible to TS
    }
  }
}

describe('extendMatchers', () => {
  it('should add custom matchers', () => {
    extendMatchers({
      toBePrice(v: string) {
        return v.startsWith('$');
      },
    });

    expect(() => $expect(1).toBePrice()).toThrow();
    expect(() => $expect('$1').toBePrice()).not.toThrow();

    // Type-only tests
    $expect('0').toBe('0');
    $expect('$0').toBePrice();
  });
});
