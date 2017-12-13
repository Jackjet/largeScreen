const path=require('path')
var webpack=require('webpack')
const ExtractTextPlugin=require('extract-text-webpack-plugin')

var HtmlWebpackPlugin=require('html-webpack-plugin')
var CleanWebpackPlugin=require('clean-webpack-plugin')
var OptimizeCSSPlugin=require('optimize-css-assets-webpack-plugin')

const VENTOR=["react"]
// module.exports={
//     entry:{
//         bundle:'./js/index.js',
//         vendor:VENTOR
//     },//入口文件
//     output:{
//         path:path.resolve(__dirname,'build'),//必须使用绝对路径，输出文件夹
//         filename:'bundle.js',//打包后输出文件的文件名
//         publicPath: "build"//知道如何寻找资源
//     },
//     module:{
//         rules:[{
//             //js文件才使用babel
//             test:/\.js$/,
//             //使用哪个loader
//             use:'babel-loader',
//             //不包括路径
//             exclude:/node_modules/
//         },{
//             test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//             use:[{
//                 loader: 'url-loader',
//                 options: {
//                     //限制图片大小10000，小鱼限制会将图片转换为base64格式
//                     limit:10000,
//                     //超出限制，创建的文件格式
//                     //build/images/[图片名].[hash].[图片格式]
//                     name:'images/[name].[hash].[ext]'
//                 }
//             }]
//         },{
//             test:/\.css$/,
//             loader:ExtractTextPlugin.extract({
//                 fallback:'style-loader',
//                 use:[{
//                 loader: "css-loader",
//                 options: {
//                      modules: true
//                 }
//                  }
//                 ]
//             })
//         }
//         ]
//     },
//     //插件列表
//     plugins: [
//         //输出文件路径
//         new ExtractTextPlugin('css/[name].[hash].css')
//     ]
// }
module.exports={
    entry:{
        bundle:'./js/index.js',
        vendor:VENTOR
    },//入口文件
    devServer:{
        port:8081
    },
    output:{
        path:path.join(__dirname,'build'),//必须使用绝对路径，输出文件夹
        filename:'[name].[chunkhash].js'//打包后输出文件的文件名
    },
    module:{
        rules:[{
            //js文件才使用babel
            test:/\.js$/,
            //使用哪个loader
            use:'babel-loader',
            //不包括路径
            exclude:/node_modules/
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use:[{
                loader: 'url-loader',
                options: {
                    //限制图片大小10000，小鱼限制会将图片转换为base64格式
                    limit:10000,
                    //超出限制，创建的文件格式
                    //build/images/[图片名].[hash].[图片格式]
                    name:'images/[name].[hash].[ext]'
                }
            }]
        },{
            test:/\.css$/,
            loader:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:[{
                loader: "css-loader",
                options: {
                     modules: true
                }
                 }
                ]
            })
        }
        ]
    },
    //插件列表
    plugins: [
        //输出文件路径
        new webpack.optimize.CommonsChunkPlugin({
            //vendor 的意义和之前的相同
            //manifest文件试讲每次打包都会改变的东西单独提取出来
            //保证，没有更改的代码无需重新打包，这样可以加快打包速度
            name:['vendor','manifest'],
            //配合manifest文件使用
            minChunks:Infinity
        }),

        new CleanWebpackPlugin(['build/*.js'],{
            verbose:true,
            dry:false
        }),
        new HtmlWebpackPlugin({
            template:'index.html'
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV":JSON.stringify("process.env.NODE_ENV")
            // 'process.env':{
            //     'NODE_ENV':"production"
            // }
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new OptimizeCSSPlugin({
            cssProcessorOptions:{
                safe:true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ]
}