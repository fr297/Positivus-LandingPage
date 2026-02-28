const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const globAll = require("glob-all");

module.exports = {
  mode: "development",
  entry: "./js/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // вместо style-loader
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]",
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new PurgeCSSPlugin({
      paths: globAll.sync([
        path.join(__dirname, "index.html"),
        path.join(__dirname, "js/**/*.js"),
      ]),
      safelist: {
        standard: [
          /^splide/,
          /^splide__/,
          /^splide__pagination/,
          /^splide__arrow/,
          /^splide__track/,
          /^splide__list/,
          /^splide__slide/,
          /^is-active$/,
          /^noScroll$/,
          /^slide-bottom$/,
          /^closeBtn$/,
        ],
        deep: [/^splide/],
        greedy: [/splide/],
      },
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "img"), to: "img" }],
    }),
  ],
  devServer: {
    port: "auto",
    open: true,
    hot: true,
  },
};
