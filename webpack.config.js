const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

const pages = ["index", "about", "barba"];

module.exports = {
  mode: mode,
  target: target,

  devtool: "source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
      // publicPath: "/",
    },
    hot: false,
    open: true,
    liveReload: true,
    compress: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  // devtool: 'eval-cheap-source-map',
  // watch: true,
  entry: pages.reduce((config, page) => {
    config[page] = path.resolve(__dirname, `js/${page}.js`);
    return config;
  }, {}),
  // entry: {
  //   home: "./js/index.js",
  //   about: "./js/about.js",
  //   barba: "./js/barba.js",
  // },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[ext][query]",
    // publicPath: "/",
    clean: true,
  },

  optimization: {
    // runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
      // chunks: "all",
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
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
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
      // analyzerMode: 'static'
      generateStatsFile: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "/about.html",
    }),
    new HtmlWebpackPlugin({
      filename: "skills.html",
      template: "/skills.html",
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "/contact.html",
    }),
  ],
};
