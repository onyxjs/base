const presets = [
  [
    '@babel/env',
    {
      corejs: 3,
      targets: {
        node: '8',
      },
      useBuiltIns: 'usage',
    },
  ],
];

module.exports = { presets };
