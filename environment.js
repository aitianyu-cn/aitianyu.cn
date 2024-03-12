/**@format */

module.exports.mode = "development";
module.exports.watchOptions = {
    poll: 200,
    aggregateTimeout: 200,
    ignore: /node_modules/,
};
module.exports.devServer = {
    port: 3000,
    host: "0.0.0.0",
};
module.exports.config = {
    autoClean: true,
    mineCss: {
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].chunk.[contenthash:6].css",
    },
    optmizeChunks: true,
    statics: {
        static: "ty-common/static",
        public: "ty-common/public",
    },
};
