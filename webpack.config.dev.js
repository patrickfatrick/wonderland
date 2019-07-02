const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge({
  entry: ['react-devtools'],
  devtool: 'source-map',
}, base);
