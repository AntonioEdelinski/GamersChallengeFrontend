const { defineConfig } = require('@vue/cli-service');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: (config) => {
    config.plugin('extract-css').use(MiniCssExtractPlugin, [{
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }]);
  },
});
