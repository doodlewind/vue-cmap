var path = require("path");
var utils = require("./utils");
var bundlePath = "dist";

module.exports = {
  bundlePath: bundlePath,
  entry: {
    index: "./app/index"
  },
  output: {
    path: path.join(process.cwd(), bundlePath),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/" + bundlePath + "/"
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(eot|ttf|woff|woff2)/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js', '.vue']
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}