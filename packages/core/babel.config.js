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
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
