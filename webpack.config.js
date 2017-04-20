const webpack = require("webpack");


module.exports = {
  context: __dirname,
  entry: "./frontend/OrganGrinder.jsx",
  output: {
    path: "./app/assets/javascripts",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
          // Don't beautify output (enable for neater output)
          beautify: false,

          // Eliminate comments
          comments: false,

          // Compression specific options
          compress: {
            warnings: false,

            // Drop `console` statements
            drop_console: true
          },
        })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
