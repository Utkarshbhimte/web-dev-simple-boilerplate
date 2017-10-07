var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ReloadPlugin = require('reload-html-webpack-plugin')

var fs = require('fs');
var content = JSON.parse(fs.readFileSync('webpack.config.json', 'utf8'));

var modules = content.modules, components = content.components;

var allEntries = modules.concat(components).reduce(function(result,module){
    result[module] = './src/js/'+module+'.js';
    return result;
},{})

var allHtmlPlugins = modules.map(function(module){
    return new HtmlWebpackPlugin({
        template: 'src/'+module+'.ejs',
        chunks: [module].concat(components),
        filename: module+'.html'
    })
})

module.exports = {
    entry: allEntries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].build.js',
        publicPath: '/'
    },    
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '/dist',
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader" 
                    }, 
                    {
                        loader: "less-loader" 
                    }]
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
                use: [
                {
                    loader: 'ejs-compiled-loader'
                }]
            },
            {
                test: /\.(ttf|otf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: allHtmlPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new ReloadPlugin()
    ])
};