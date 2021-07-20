const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDirectory = 'build/public';

module.exports = {
  // Tell webpack the root file of our
  // client application
  entry: './src/client/client.js',
  mode: 'development',
  resolve: {
    fallback: {
      fs: false,
      util: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
      // if you want to use this module also don't forget npm i crypto-browserify
      'crypto-browserify': require.resolve('crypto-browserify'),
    },
  },
  node: {
    // __dirname: false,
  },
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, outputDirectory),
    publicPath: '/build/public',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new MiniCssExtractPlugin({
      filename: 'public/css/[name].css',
      chunkFilename: 'public/css/[id].css',
      ignoreOrder: false,
    }),
  ],
};
