const merge = require('webpack-merge');
const rules = require("./components/rules.js");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(rules, {
    context: __dirname,
    entry: ['../../main.js', '../../main.less'],
    node: {
        dns: 'mock',
        net: 'mock',
        fs: 'empty'
    },
    resolve: {
        alias: {
            'masonry': 'masonry-layout',
            'isotope': 'isotope-layout',
            'vue': 'vue/dist/vue.min.js'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    output: {
        publicPath: '/',
        path: __dirname + "../../../template/assets",
        filename: "bundle.js"
    }
});