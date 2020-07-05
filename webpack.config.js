import TerserPlugin from 'terser-webpack-plugin';
import { isDevelopment } from './gulp/configuration';

const configuration = {
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        exclude: /(dist|node_modules)/,
        test: /\.(js|ts)$/,
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

const development = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
};

const production = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /(dist|node_modules)/,
        test: /\.(js|ts)$/,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};

export default {
  ...configuration,
  ...(isDevelopment ? development : production),
};
