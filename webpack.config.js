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
              presets: [
                [
                  'env',
                  {
                    targets: { browsers: ['last 2 versions', '> 5%'] },
                  }
                ],
                'react'
              ],
              plugins: ['transform-runtime', 'transform-object-rest-spread', 'transform-class-properties'],
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
