const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PROD = JSON.parse(process.env.PROD_ENV || '1');

const config = {
	context: __dirname,
	entry: PROD ? ['./main.js', './main.less'] : ['./main.js', './main.less'],
	devtool: PROD ? '' : 'eval',
	output: {
		publicPath: '/',
		path: __dirname + "/template/assets",
		filename: "bundle.min.js"
	},
	node: {
	dns: 'mock',
	net: 'mock'
	},
	resolve: {
	    alias: {
	      'masonry': 'masonry-layout',
	      'isotope': 'isotope-layout'
	    }
	},
	module: {
  		loaders: [
    		{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    		{ test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] }},

			{ 
	            test: /(isotope|masonry|outlayer|item|get-size|fizzy-ui-utils\/utils)\.js$/, 
	            loader: 'imports?define=>false' 
        	},
        	
    		PROD ? {
    			test: /\.less$/, 
    			exclude: /node_modules/, 
    			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!autoprefixer-loader") 

    		} : { 
    			
    			test: /\.less$/, 
    			exclude: /node_modules/, 
    			loader: "style!css!autoprefixer!less"
    		},
    		{ test: /\.css$/, exclude: /node_modules/, loader: "style!css!autoprefixer!less" },
    		{ test: /\.json$/, loader: "json-loader"} 		
  		]
	},
	plugins: [
	  new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
	  }),
	  new webpack.optimize.UglifyJsPlugin({
	    compress: { 
	    	warnings: false 
	    },
	    output: {
    		comments: false
  		},
  		minimize: false,
  		debug: true,
  		sourceMap: true
	  }),
	  new ExtractTextPlugin("./bundle.min.css"),
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
	debug: true
};

module.exports = config;