import {isDevelopment} from './gulp/configuration.js';

const development = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'main.min.js'
  }
};

const production = {
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /(dist|node_modules)/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: 'main.min.js'
  }
};

export default isDevelopment ? development : production;