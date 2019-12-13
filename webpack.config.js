const webpack = require("webpack");
const path = require("path");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    client: "./src/client/client-entry",
  },
  target: "web",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist", "build")
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
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
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              modules: true,
              sourceMap: true,
              importLoader: 2
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        use: "ignore-loader"
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
    }),
    new StatsWriterPlugin({
      filename: "stats.json"
    })
  ]
};
