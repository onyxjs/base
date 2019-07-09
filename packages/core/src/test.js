export default function Test(...args) {
  this.description = '';
  this.duration = null;
  this.error = false;
  this.fn = null;
  this.status = null;
  this.tests = [];
  this.timeout = null;

  args.forEach(arg => {
    if (typeof arg === 'string') {
      this.desc = arg;
    } else if (typeof arg === 'function') {
      this.fn = arg;
    } else {
      Object.assign(this, arg);
    }
  });
};

describe('example', () => {
  it('should be a valid example test', () => {
    expect(1).toBeTruthy();
  });
});
