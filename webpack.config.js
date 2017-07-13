const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const extractLess = new ExtractTextPlugin({
  filename: "[name].[chunkhash].css"
});

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),

  entry: {
    semantic: './css/semantic.less',
    styles: './css/styles.css',
    vendor: [
      'rxjs'
    ],
    app: './main.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.html', '.css'],
    modules: ['node_modules']
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
