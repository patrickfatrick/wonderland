const webpack = require('webpack');
const path = require('path');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: [
    '@babel/polyfill',
    'whatwg-fetch',
    'intersection-observer',
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['eslint-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunksPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new ExtractCssChunksPlugin({
      filename: 'styles.css',
      cssModules: true,
    }),
    new StylelintPlugin({
      files: ['src/**/*.css'],
    }),
  ],
};
