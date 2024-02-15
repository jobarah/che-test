module.exports = {
  mode: 'production',
  entry: ['./src/main.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    library: 'MyApp',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [...require('./webpack.plugins')],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'errors-warnings',
  optimization: {
    minimize: false,
  }
  // optimization: {
  //   minimize: true,
  //   sideEffects: true,
  //   concatenateModules: true,
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: 10,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendors',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
};
