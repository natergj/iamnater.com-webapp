const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "[name].[chunkhash].js",
    path: __dirname + "/dist",
    publicPath: "/",
  },
  mode: process.env.WEBPACK_BUILD_MODE || "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react/,
          priority: -5
        },
        materialui: {
          test: /[\\/]node_modules[\\/]@material-ui/,
          priority: -10
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -20
        },
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: "index.html", template: "src/index.ejs" }),
    new webpack.DefinePlugin({
      GRAPHQL_URI: JSON.stringify(process.env.GRAPHQL_URI || 'http://127.0.0.1:3000/graphql'),
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: "source-map",
};
