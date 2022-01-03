const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const DIST_DIR = path.join(__dirname, 'src', 'intermediates');
const DEV_PORT = 33500;

const initHtmlPlugin = () => new HtmlWebpackPlugin({
  templateParameters: {
    content: JSON.stringify(require('../../../wix-react-native-rich-content/rich-content-playground/example-content/all-plugins.json')),
  },
  template: '../../../wix-react-native-rich-content/demo/rce-web-adapter/index.ejs',
  inject: 'head',
});

module.exports = (_env, argv) => {
  const isDevMode = argv.mode !== 'production';
  const commonPlugins = [new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}), new ExtractTextWebpackPlugin('wix-one-app-rce.css')];
  const plugins = isDevMode ?
    [...commonPlugins, initHtmlPlugin()] :
    commonPlugins;

  return {
    entry: './src/render-editor.tsx',
    output: {
      path: DIST_DIR,
      filename: 'bundled-rce-web.js',
      library: 'WebRce',
      libraryTarget: 'umd',
    },
    devServer: {
      contentBase: DIST_DIR,
      port: DEV_PORT,
    },
    resolve: {
      alias: {
        _$: 'lodash',
        React$: 'react',
        ReactDOM$: 'react-dom',
        ReactDOMServer$: 'react-dom/server',
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.html'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
      },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-react-jsx'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          include: /node_modules/,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          include: /pro-gallery/,
          use: 'url-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: isDevMode ?
                  '[path][name]__[local]--[hash:base64:5]' :
                  '[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        },
      ],
    },
    plugins,
  };
};
