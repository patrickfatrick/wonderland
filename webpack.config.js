var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    './main.jsx'
  ],
  output: {
    path: path.join(__dirname, '/public/dist/'),
    publicPath: 'http://localhost:8080/public/dist/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loader: 'standard'
      }
    ],
    loaders: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  babel: {
    presets: ['react', 'es2015', 'stage-2'],
    plugins: ['transform-runtime']
  },
  plugins: [
    // Babel does not support promises out of the box, it must be polyfilled
    new webpack.ProvidePlugin({
      'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ]
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = '#source-map'
} else {
  module.exports.plugins.unshift(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  )
}
