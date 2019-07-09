module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    semi: 'error',
    'eol-last': 'error'
  }, 
};
