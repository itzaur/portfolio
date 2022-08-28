const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

let mode = "development";
let target = "web";
// let devtool = "source-map";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
  // devtool = false;
}

// const pages = ["index", "about", "barba"];

module.exports = {
  mode: mode,
  target: target,

  // devtool: devtool,
  devtool: "source-map",
  // devtool: "inline-source-map",

  // devtool: 'eval-cheap-source-map',
  // watch: true,
  // entry: pages.reduce((config, page) => {
  //   config[page] = path.resolve(__dirname, `js/${page}.js`);
  //   return config;
  // }, {}),
  entry: {
    // home: "./js/index.js",
    // about: "./js/about.js",
    main: "./js/barba.js",
  },
  output: {
    filename: "js/[name][contenthash].js",
    // filename: "js/[name].js",
    // chunkFilename: "js/[name].[id].js",
    // chunkFilename: "js/chunk.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[ext][query]",
    // publicPath: ".",
    clean: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
      // directory: path.join(__dirname, "dist"),
      // publicPath: "/",
    },
    hot: false,
    open: true,
    liveReload: true,
    compress: true,
    // historyApiFallback: true,
    devMiddleware: {
      // index: true,
      // serverSideRender: true,
      writeToDisk: true,
    },
  },

  optimization: {
    // runtimeChunk: "single",
    // usedExports: true,
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: "styles",
    //       type: "css/mini-extract",
    //       chunks: "all",
    //       // enforce: true,
    //     },
    //   },
    // },
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
          // mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        // generator: {
        //   filename: "images/[name]-[hash][ext]",
        // },
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
      // verbose: true,
      // cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
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
      // favicon: "./favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./about.html",
      // favicon: "./favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      filename: "skills.html",
      template: "./skills.html",
      // favicon: "./favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "./contact.html",
      // favicon: "./favicon/favicon.ico",
    }),
    // new FaviconsWebpackPlugin("./favicon/logo.svg"),
    new FaviconsWebpackPlugin({
      logo: "img/logo.svg",
      // mode: "webapp",
      // devMode: "webapp",
      prefix: "favicons/",
      // cach: true,
      // inject: (htmlPlugin) => {
      //   return true;
      // },
      manifest: "./favicon/site.webmanifest",
      favicons: {
        background: "#fff",
        theme_color: "#4f5878",
        // theme_color: "#5bbad5",
      },
    }),
  ],
};
