import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from  'copy-webpack-plugin';

module.exports = {
  context: `${__dirname}/app`,
  entry: {
    content_script: './src/content_scripts/main.js',
    background: './src/background.js',
    options: './src/options.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['options'],
      template: 'options.ejs',
      filename: 'options.html',
    }),
    new CopyWebpackPlugin([
      {from: 'manifest.json'},
      {from: 'img/icon.png',to:'img/icon.png'},
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel?presets[]=es2015','eslint-loader'],
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      { test: /\.jpg$/, loader: 'file-loader' },
    ],
  },
};
