const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
  //...
  entry: {
    client: [
      "webpack-dev-server/client?http://localhost:9091/",
      "webpack/hot/dev-server",
      "./src/client/client-entry.js"
    ]
  },
  devtool: "source-map",
  output: {
    filename: "[name].dev.js",
    publicPath: "http://localhost:9091/"
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
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
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
  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, "src"),
    compress: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    port: 9091,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __CLIENT__: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
