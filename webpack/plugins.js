/**@format */

function generatePlugin() {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    const development = require("../environment");
    const _plugins = [];

    if (development) {
        // _plugins.push(new BundleAnalyzerPlugin());
    }

    return _plugins;
}

module.exports.plugins = generatePlugin();

module.exports.config = {
    autoClean: true,
    mineCss: {
        filename: "[name].[contenthash:6].css",
        chunkFilename: "[name].[contenthash:8].css",
    },
    optmizeChunks: true,
};
