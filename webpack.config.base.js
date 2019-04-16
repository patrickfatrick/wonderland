const webpack = require("webpack");
const path = require("path");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  entry: [
    "@babel/polyfill",
    "whatwg-fetch",
    "resize-observer-polyfill/dist/ResizeObserver.global.js",
    "intersection-observer",
    "requestidlecallback",
    "./src/main",
  ],
  output: {
    path: path.join(__dirname, "/dist/"),
    publicPath: "http://localhost:8080/dist/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: [{ loader: "eslint-loader", options: { fix: true } }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunksPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ExtractCssChunksPlugin({
      filename: "styles.css",
      cssModules: true,
    }),
    new StylelintPlugin({
      files: ["src/**/*.css"],
    }),
  ],
};
