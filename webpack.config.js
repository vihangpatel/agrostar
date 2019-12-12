const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './src',
    target: 'browser',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules :[
            {
                test: '/\.js?$/',
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: "babel-loader"
            },
            {

            }
        ]
    }
}