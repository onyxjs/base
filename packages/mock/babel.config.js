const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: '8',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
  '@babel/preset-typescript',
];

module.exports = { presets };
