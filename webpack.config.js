var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var fs = require('fs');
var content = JSON.parse(fs.readFileSync('webpack.config.json', 'utf8'));

var modules = content.modules, components = content.components;

var allEntries = modules.concat(components).reduce(function(result,module){
    result[module] = './src/js/'+module+'.js';
    return result;
},{});

var allHtmlPlugins = modules.map(function(module){
    return new HtmlWebpackPlugin({
        template: 'src/'+module+'.ejs',
        chunks: [module].concat(components),
        filename: module+'.html'
    });
});

var extractLess = new ExtractTextPlugin({
    filename: "styles/[name].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry: allEntries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].build.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [
                    {
                        loader: "css-loader" 
                    }, 
                    {
                        loader: "less-loader" 
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.ejs$/,
                use: 'ejs-compiled-loader'
            },
            {
                test: /\.(ttf|otf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: allHtmlPlugins.concat([
        extractLess,
        new CleanWebpackPlugin(['dist/*.*']),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin({
            minimize: true
        })
    ])
};