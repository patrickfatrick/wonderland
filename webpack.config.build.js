const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          output: { comments: false },
          compress: {
            dead_code: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
});
