/**@format */

const webpack = require("webpack");

function generatePlugin() {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    const development = require("../tools/config/devEnv");
    const _plugins = [];

    if (development) {
        _plugins.push(new BundleAnalyzerPlugin());
    }

    return _plugins;
}

module.exports = generatePlugin();
