exports.default = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  externals: {
    child_process: 'require(\'child_process\')',
    fs: 'require(\'fs\')',
  },
  module: {
    rules: [
      {
        loader: [
          {
            loader: 'ts-loader',
          },
        ],
        test: /\.tsx?$/,
      },
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
    extensions: ['.ts', '.tsx', '.js'],
  },
};
