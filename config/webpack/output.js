const isProduction = JSON.parse(process.env.PROD_ENV ? true : false);

module.exports = {
    output: {
        publicPath: '/',
        path: __dirname + "../../../template/assets",
        filename: "bundle.js"
    }
};