const path = require('path');

const { ContextReplacementPlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const extractLess = new ExtractTextPlugin({
  filename: "[name].[chunkhash].css"
});

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),

  entry: {
    semantic: './css/semantic.less',
    styles: './css/styles.less',
    vendor: './vendor.ts',
    app: './main.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.html', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
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
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "less-loader",
            options: {
              relativeUrls: false
            }
          }
        ]
      }
        // use: extractLess.extract({
        //   use: [
        //     // 'style-loader',
        //     'css-loader',
        //     {
        //       loader: "less-loader",
        //       options: {
        //         relativeUrls: false
        //       }
        //     }
        //   ]
        // })
    ]
  },

  plugins: [
    extractLess,
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src')
    ),
    new TsConfigPathsPlugin({
      baseUrl:  path.resolve(__dirname, 'src'),
      // compiler: 'typescript',
      tsconfig: path.resolve(__dirname, 'src', 'tsconfig.json')
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
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
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
};
