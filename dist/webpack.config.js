'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './js/index.js', //入口文件
    output: {
        path: path.resolve(__dirname, 'build'), //必须使用绝对路径，输出文件夹
        filename: 'bundle.js', //打包后输出文件的文件名
        publicPath: "build" //知道如何寻找资源
    },
    module: {
        rules: [{
            //js文件才使用babel
            test: /\.js$/,
            //使用哪个loader
            use: 'babel-loader',
            //不包括路径
            exclude: /node_modules/
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    //限制图片大小10000，小鱼限制会将图片转换为base64格式
                    limit: 10000,
                    //超出限制，创建的文件格式
                    //build/images/[图片名].[hash].[图片格式]
                    name: 'images/[name].[hash].[ext]'
                }
            }]
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }]
            })
        }]
    },
    //插件列表
    plugins: [
    //输出文件路径
    new ExtractTextPlugin('css/[name].[hash].css')]
};
//# sourceMappingURL=webpack.config.js.map