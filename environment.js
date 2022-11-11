/**@format */

module.exports.mode = "development";
module.exports.watchOptions = {
    poll: 1000,
    aggregateTimeout: 1000,
    ignore: /node_modules/,
};
module.exports.devServer = {
    port: 3000,
    host: "0.0.0.0",
};
