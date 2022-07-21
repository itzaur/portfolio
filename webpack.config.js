const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  devtool: "source-map",
  // devtool: 'eval-cheap-source-map',
  watch: true,
  entry: {
    // home: ["babel-regenerator-runtime", "./js/index.js"],
    // about: ["babel-regenerator-runtime", "./js/about.js"],
    // barba: ["babel-regenerator-runtime", "./js/barba.js"],
    // home: path.resolve(__dirname, "./js/index.js"),
    // about: path.resolve(__dirname, "./js/about.js"),
    // barba: path.resolve(__dirname, "./js/barba.js"),
    home: "./js/index.js",
    about: "./js/about.js",
    barba: "./js/barba.js",
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "./images/[name].[ext]",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
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
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
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
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new BundleAnalyzerPlugin({
      // analyzerMode: 'static'
    }),
  ],
};
