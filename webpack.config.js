const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: __dirname + "/dist",
    publicPath: "/",
  },
  mode: process.env.WEBPACK_BUILD_MODE || "production",
  performance: {
    assetFilter: assetFilename => !/\.map$/.test(assetFilename) && !/^vendors/.test(assetFilename),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react/,
          priority: -5,
        },
        materialui: {
          test: /[\\/]node_modules[\\/]@material-ui/,
          priority: -10,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: "index.html", template: "src/index.ejs" }),
    new webpack.DefinePlugin({
      GRAPHQL_URI: JSON.stringify(process.env.GRAPHQL_URI || "/graphql"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: path.resolve(__dirname, "./node_modules"), use: ["babel-loader", "ts-loader"] },
      {
        test: /\.(png|jpe?g|gif|pdf)$/i,
        use: [{ loader: "file-loader", options: { name: "assets/[name].[contenthash].[ext]" } }],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    host: "0.0.0.0",
    public: "home.local:8080",
    proxy: [
      {
        context: ["/graphql"],
        target: "http://localhost:3000",
        secure: false,
      },
    ],
  },
  devtool: "source-map",
};
