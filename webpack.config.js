const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

console.log("IS DEV:", isDev);

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: ["./js/index.js", "/js/burger.js"],
    info: ["./js/about.js"],
    instruction: ["./js/instruction.js"],
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 4200,
    hot: isDev,
    liveReload: true,
    watchFiles: [path.join(__dirname, "src/**/*")],
  },
  cache: false,
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev,
      },
      chunks: ["main"],
    }),
    new HTMLWebpackPlugin({
      filename: "info.html",
      template: "./info.html",
      minify: {
        collapseWhitespace: !isDev,
      },
      chunks: ["info"],
    }),
    new HTMLWebpackPlugin({
      filename: "instruction.html",
      template: "./instruction.html",
      minify: {
        collapseWhitespace: !isDev,
      },
      chunks: ["instruction"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};
