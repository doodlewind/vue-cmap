var conf = require('./webpack.base.conf');
var webpack = require("webpack");

conf.output.filename = "[name].bundle.js";
conf.output.chunkFilename = "[id].chunk.js";
conf.debug = false;
conf.plugins = conf.plugins.concat([
  new webpack.DefinePlugin({
    "process.env": { "NODE_ENV": JSON.stringify("production") }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]);

webpack(conf, function(err, stats) {
  if (err) throw err;
  console.log(stats.toString({
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }));
  console.log("build success");
});
