const presets = [
  [
    '@babel/env',
    '@babel/preset-typescript',
    {
      targets: {
        node: '8',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
];

module.exports = { presets };
