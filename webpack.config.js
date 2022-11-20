/* eslint-disable import/no-extraneous-dependencies */

import TerserPlugin from 'terser-webpack-plugin';
import { isDevelopment } from './gulp/configuration.js';

const defaultConfiguration = {
  resolve: {
    extensions: ['.js', '.ts'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
  module: {
    rules: [
      {
        exclude: /(?:dist|node_modules)/,
        test: /\.(?:js|ts)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'main.js',
  },
};

const developmentConfiguration = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
};

const productionConfiguration = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /(?:dist|node_modules)/,
        test: /\.(?:js|ts)$/,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};

const configuration = {
  ...defaultConfiguration,
  ...(isDevelopment ? developmentConfiguration : productionConfiguration),
};

export { configuration };
export default configuration;
