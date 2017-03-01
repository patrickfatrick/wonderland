const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/main',
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: 'http://localhost:8080/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['eslint-loader'],
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-2'],
              plugins: ['transform-runtime'],
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = '#source-map';
} else {
  module.exports.plugins.unshift(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  );
}
