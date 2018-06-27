const isProduction = JSON.parse(process.env.PROD_ENV ? true : false);
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [];
/*********************/

// @plugin: node env
const nodeENV = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
});

isProduction ? plugins.push(nodeENV) : false;

/*****************************/

// @plugin: compile all less files into master CSS
const CSSBundle = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "bundle.css",
    chunkFilename: "[id].css"
});

plugins.push(CSSBundle);

/*********************/

// @plugin: extend jquery for jquery plugins
const jQueryExtend = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
});

plugins.push(jQueryExtend);

/*********************/

// @plugin: handling es6 promises
const promises = new webpack.ProvidePlugin({
    'Promise': 'es6-promise',
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
});

plugins.push(promises);

/*********************/

// @plugin: post CSS
const postCSS = [
    require('autoprefixer')
]

postCSS.forEach((item) => {
    plugins.push(item);
});

/*********************/
//@plugin: Vue components
const vueComponents = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"'
    }
})

if (isProduction) {
    plugins.push(vueComponents);
}

// // // @plugin: for minifying javascript
// const minify = new webpack.optimize.UglifyJsPlugin({
//     compress: {
//         warnings: false
//     },
//     output: {
//         comments: isProduction ? false : true,
//     },
//     minimize: isProduction ? true : false,
//     debug: false,
//     sourceMap: true,
//     minify: isProduction ? true : false,
// });

// //if production is set, js will be minified
// plugins.push(minify);

module.exports = {
    plugins
}