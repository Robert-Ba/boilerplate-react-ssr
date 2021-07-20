const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDirectory = 'build';

module.exports = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather then for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './src/server/server.js',
  mode: 'development',
  node: {
    __dirname: false,
  },
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outputDirectory),
    publicPath: '/build',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: 'defaults',
            }],
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: { emitFile: false },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '/public/img/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
  // Tell webpack not to bundle any libraries that exist in the 'node_modules' folder
  // into the server bundle
  externals: [webpackNodeExternals()],
};
