const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
  },
});
