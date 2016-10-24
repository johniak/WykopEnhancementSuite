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
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
