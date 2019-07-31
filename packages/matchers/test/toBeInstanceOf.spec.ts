import toBeInstanceOf from '../src/toBeInstanceOf';

describe('toBeInstanceOf', () => {
  it('Should be an instance of', () => {
    expect(toBeInstanceOf('window', Window)).toBeTruthy;
    expect(toBeInstanceOf(document.body, Element)).toBeTruthy;
    expect(toBeInstanceOf([], Array)).toBeTruthy;
    expect(toBeInstanceOf({}, Window)).toBeFalsy;
  });
});
