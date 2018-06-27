const isProduction = JSON.parse(process.env.PROD_ENV ? true : false);

module.exports = {
    context: __dirname,
    entry: ['../../main.js', '../../main.less'],
    devtool: isProduction ? '' : 'eval',
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
    }
};