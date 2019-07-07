exports.default = {
  module: {
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
    },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
