const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals")

const buildPath = path.join(__dirname, "dist")


module.exports = {
  entry: "./src/server/index.js",
  target: "node",
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty",
    __dirname: false,
    __filename: false
  },
  output: {
    path: buildPath,
    filename: "server.js",
    chunkFilename: "server.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ["/node_modules/"],
        loaders: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)?$/,
        use: "ignore-loader",
      }
    ]
  }
};
