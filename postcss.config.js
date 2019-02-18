const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const lost = require('lost');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport,
    postcssCssnext(),
    lost,
    cssnano({
      preset: 'default',
    }),
  ],
};
