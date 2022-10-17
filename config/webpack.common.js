const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const { raw, stringified } = require("./env");
const paths = require("./paths");

const isDevelopment = raw.NODE_ENV === "development";
const isProduction = raw.NODE_ENV === "production";

module.exports = {
  entry: paths.appEntry,
  resolve: {
    alias: {
      "@": paths.appSrc,
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  output: {
    path: paths.appBuild,
    clean: true,
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|png|jpe?g|gif)$/i,
        type: "asset",
        generator: {
          filename: "static/media/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            dependency: { not: ["url"] },
            use: ["@svgr/webpack", "new-url-loader"],
          },
          {
            type: "asset/resource",
            generator: {
              filename: "static/media/[name].[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          template: paths.appHtml,
          favicon: `${paths.appSrc}/assets/svg/logo.svg`,
          inject: "body",
        },
        isProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    ),
    new webpack.DefinePlugin(stringified),
  ],
};
