const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPlugin = new ExtractTextPlugin('./css/[name].css');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HTMLWebpackPlugin({
  template: __dirname + '/src/view/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: {
    app: __dirname + '/src/client.js'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'static/',
    filename: 'js/[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({browsers: ['last 2 versions']}),
            require('postcss-nested')(),
            require('cssnano')(),
            require('postcss-assets')()
          ]
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('postcss-nested')(),
                  require('autoprefixer')({browsers: ['last 2 versions']}),
                  require('cssnano')()
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      }
    ]
  },
  plugins: [
    extractTextPlugin,
    htmlWebpackPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  resolve: {
    alias: {
      'Vue': 'vue/dist/vue.esm.js'
    }
  }
}
