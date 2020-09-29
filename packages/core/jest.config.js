module.exports = {
  preset: 'ts-jest',
  roots: ['test/'],
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
};
