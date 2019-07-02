const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const lost = require('lost');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport,
    postcssPresetEnv({ stage: 0 }),
    lost,
    cssnano({
      preset: 'default',
    }),
  ],
};
