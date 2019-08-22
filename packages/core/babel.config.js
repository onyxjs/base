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

const plugins = [
  '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
