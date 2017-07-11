const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),

  entry: {
    semantic: './css/semantic.min.css',
    styles: './css/styles.css',
    vendor: [
      'rxjs'
    ],
      // './vendor.ts',
    app: './main.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.html', '.css'],
    modules: ['node_modules'],
    alias: {
    }
  },
  module: {
    rules: [
      {
        test: /\.html$|\.json$|\.md$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, 'src', 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/g
    })
  ],

  devtool: 'inline-source-map',

  devServer: {
    port: 4000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
};
