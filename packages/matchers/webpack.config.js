exports.default = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: __dirname + '/dist',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
};
