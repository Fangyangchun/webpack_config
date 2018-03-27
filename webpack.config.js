var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var assets = 'release/';
var jsSrc = path.join(__dirname,'src');
var entries = getEntries();
var chunks = Object.keys(entries);

function getEntries(){

    var files = fs.readdirSync(jsSrc);

    var regexp = /(.*)\.js$/;
    var map = {};

    files.forEach((file)=>{
        var matchfile = file.match(regexp);

        if( matchfile ){
            map[matchfile[1]] = path.resolve(__dirname,jsSrc+"/"+matchfile[0])
        }

    });

    return map;
}

module.exports = {
    entry: {
        bundle1: './src/index.js',
        bundle2: './src/test.js'
    },
    output: {
        path: path.resolve(assets),    // 默认会生成`dist/`文件夹
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: [ 'css-loader' ]
                })
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'url-loader?limit=8192&name=static/images/[hash:8].[name].[ext]'
                    /*option: {
                        limit: 8192
                    }*/
                }
            }
        ]
    },
    optimization: {
        minimize: false,
        runtimeChunk: {
            name: 'vendor'
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    },
    plugins: [new HtmlWebpackPlugin(),
        new ExtractTextPlugin({
            filename: function (getPath) {
                return getPath('css/[contenthash:8].[name].min.css').replace('css/js', 'css')
            },
            allChunks: false
        })
    ]
};
