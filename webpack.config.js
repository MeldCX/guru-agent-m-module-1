const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: [
        './src/app/main.js'
    ],

    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        alias: {
            glow: path.resolve('./node_modules/@meldcx/glow'),
            styles: path.resolve('./src/styles')
        },
        modules: ['node_modules']
    },


    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                include: [
                    SRC_PATH
                ],
                loader: 'babel-loader'
            },
            {
                test: /.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /.html/,
                loader: 'html-loader'
            }
        ]
    },

    plugins: [new HTMLWebpackPlugin({
        title: 'MeldCX Guru - Agent M - Idle Detection',
        template: path.resolve('./index.html')
    })]
}
