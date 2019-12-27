const path = require('path');
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './')
  },
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {plugins: [require('autoprefixer')]}
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2017']
        }
      }
    ]
  },
  devServer: {
    stats: {
      // Hide children information
      children: false,
      // Set the maximum number of modules to be shown
      maxModules: 0
    }
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // eslint-disable-line
  devtool:
    // eslint-disable-line
    process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'cheap-module-source-map'
};
