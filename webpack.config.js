var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    './main.jsx'
  ],
  output: {
    path: path.join(__dirname, '/public/dist/'),
    publicPath: '/public/dist/',
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
        loader: 'babel'
      }
    ]
  },
  babel: {
    presets: ['react', 'es2015', 'stage-2'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'imports?this=>global!exports?global.Promise!es6-promise'
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  )
  module.exports.devtool = '#source-map'
} else {
  module.exports.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  )
}
