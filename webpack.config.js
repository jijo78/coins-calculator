var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:5000',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders:[{
          test: /\.js$/,
          loaders: ['react-hot-loader', 'babel-loader'],
          include: path.join(__dirname, 'src')
      },
      { test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap',
      }]
    }

}
