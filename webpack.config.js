const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode: mode,
  target: target,

  devtool: "source-map",

  entry: {
    main: "./js/barba.js",
  },

  output: {
    filename: "js/[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[ext][query]",
    clean: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    hot: false,
    open: true,
    liveReload: true,
    compress: true,
    // historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|pdf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new BundleAnalyzerPlugin({
      // analyzerMode: 'static',
      // analyzerMode: process.env.STATS || "disabled",
      generateStatsFile: true,
      // statsOptions: {
      //   exclude: /node_modules/,
      // },
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./about.html",
    }),
    new HtmlWebpackPlugin({
      filename: "skills.html",
      template: "./skills.html",
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "./contact.html",
    }),
    new FaviconsWebpackPlugin({
      logo: "img/logo.svg",
      prefix: "favicons/",
      manifest: "./favicon/site.webmanifest",
      favicons: {
        background: "#fff",
        theme_color: "#f8edc4",
      },
    }),
  ],
};
