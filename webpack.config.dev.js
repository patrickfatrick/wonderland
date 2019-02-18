const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  devtool: 'source-map',
});
