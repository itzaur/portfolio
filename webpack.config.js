module.exports = {
  devtool: 'source-map',
  // devtool: 'eval-cheap-source-map',
  watch: true,
  entry: {
    home: ['babel-regenerator-runtime', './js/index.js'],
    about: ['babel-regenerator-runtime', './js/about.js'],
    barba: ['babel-regenerator-runtime', './js/barba.js'],
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
