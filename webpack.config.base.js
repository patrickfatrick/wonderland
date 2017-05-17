const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/main'
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: 'http://localhost:8080/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [ 'eslint-loader' ]
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new ExtractTextPlugin('styles.css')
  ]
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
