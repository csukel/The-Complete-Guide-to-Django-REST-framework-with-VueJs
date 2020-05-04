const BundleTracker = require("webpack-bundle-tracker");
const port = process.env.port || 8080;
module.exports = {
    // on Windows you might want to set publicPath: "http://127.0.0.1:8080/" 
    publicPath: "http://127.0.0.1:" + port + "/", 
    outputDir: './dist/',

    chainWebpack: config => {

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{filename: './webpack-stats.json'}])

        config.output
            .filename('bundle.js')

        config.optimization
        	.splitChunks(false)

        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            // the first 3 lines of the following code have been added to the configuration
            .public('http://127.0.0.1:' +port)    
            .host('127.0.0.1')    
            .port(port)
            .hotOnly(true)
            .watchOptions({poll: 1000})
            .https(false)
            .disableHostCheck(true)
            .headers({"Access-Control-Allow-Origin": ["\*"]})

    },

    // uncomment before executing 'npm run build' 
    // css: {
    //     extract: {
    //       filename: 'bundle.css',
    //       chunkFilename: 'bundle.css',
    //     },
    // }

};