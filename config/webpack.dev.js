const baseConfig = require('./webpack.base.js');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new ReactRefreshWebpackPlugin(), // 添加热更新插件
    ],
    devServer: {
        port: 3001, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新
        static: {
            directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
            publicPath: '/',
        }
    }
});
