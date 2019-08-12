import toThrow from '../src/toThrow';

export class DemoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DemoError';
  }
}

describe('toThrow', () => {
  it('should check functions', () => {
    const throwingFn = () => { throw new Error('test'); };
    const throwingFn2 = () => { throw new DemoError('wasd'); };
    expect(toThrow(throwingFn, 'test')).toBeTruthy();
    expect(toThrow(() => throwingFn(), 'test')).toBeTruthy();
    expect(toThrow(() => undefined, 'test')).toBeFalsy();
    expect(toThrow(() => { throw new Error('test1'); }, 'test')).toBeTruthy();
    expect(toThrow(() => throwingFn(), 'test1')).toBeFalsy();
    expect(toThrow(throwingFn2, 'wasd')).toBeTruthy();
    expect(toThrow(throwingFn2, DemoError)).toBeTruthy();
    expect(toThrow(throwingFn2, 'demo')).toBeFalsy();
    expect(toThrow(throwingFn2, TypeError)).toBeFalsy();
  });
});
