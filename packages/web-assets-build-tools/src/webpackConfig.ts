const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const DEV_PORT = 33500;

const initHtmlPlugin = () => new HtmlWebpackPlugin();

export const generateWebpackConfig = ({
  isDevMode, entry, filename, library, distDir,
}: {
  isDevMode: boolean;
  entry: string;
  filename: string;
  library: string;
  distDir: string;
}) => {
  const commonPlugins = [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }), new ExtractTextWebpackPlugin('wix-one-app-rce.css')];
  const plugins = isDevMode
    ? [...commonPlugins, initHtmlPlugin()]
    : commonPlugins;

  return {
    entry,
    output: {
      path: distDir,
      filename,
      library,
      libraryTarget: 'umd',
    },
    devServer: {
      contentBase: distDir,
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
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  outDir: distDir,
                },
              },
            },
          ],
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
                localIdentName: isDevMode
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64:5]',
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
