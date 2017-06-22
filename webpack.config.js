const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),

  entry: {
    vendor: './vendor.ts',
    app: './main.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.html'],
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
        test: /\.csv$/,
        use: {
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      },
      {
        test: /\.tsx?|\.ts?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, 'src', 'tsconfig.json')
            }
          }
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       'postcss-loader',
      //       {
      //         loader: 'sass-loader',
      //         options: {
      //           includePaths: [
      //             path.resolve(__dirname, 'node_modules'),
      //             // path.resolve(__dirname, 'node_modules', '@material')
      //           ]
      //         }
      //       }
      //     ]
      //   })
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    // new ExtractTextPlugin({
    //   filename: 'styles.css',
    //   allChunks: false,
    //   disable: true
    // }),

    // new CommonsChunkPlugin({
    //   names: ['vendor', 'manifest']
    // })
  ],

  devtool: 'inline-source-map',

  devServer: {
    port: 4001,
    historyApiFallback: true
  }
};
