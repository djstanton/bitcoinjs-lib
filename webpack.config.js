var path = require('path');
var webpack = require('webpack');
var SpritesmithPlugin = require('webpack-spritesmith');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|jpg|gif|svg|json)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
      new SpritesmithPlugin({
          src: {
              cwd: path.resolve(__dirname, 'src/assets/sprite'),
              glob: '*.png'
          },
          retina: '@2x',
          target: {
              image: path.resolve(__dirname, 'dist/sprites/sprite.[hash:7].png'),
              css: path.resolve('dist/sprite.css')
          },
          apiOptions: {
              cssImageRef: 'sprites/sprite.[hash:7].png'
          }
      }),
      new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
