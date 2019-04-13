const merge = require("webpack-merge");
const base = require("./webpack.config.base");

const isQuiet = process.env.QUIET === "true";

module.exports = merge({
  entry: isQuiet ? [] : ["react-devtools"],
  devtool: "source-map",
}, base);
