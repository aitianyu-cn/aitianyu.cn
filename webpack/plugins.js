/**@format */

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    autoClean: true,
    mineCss: {
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].chunk.[contenthash:6].css",
    },
    optmizeChunks: true,
};

function generatePlugin() {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    const development = require("../environment");
    const _plugins = [];

    _plugins.push(new MiniCssExtractPlugin(config.mineCss));

    _plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../src/static"),
                    to: path.resolve(__dirname, "../build/static"),
                },
                {
                    from: path.resolve(__dirname, "../src/public"),
                    to: path.resolve(__dirname, "../build/public"),
                },
            ],
        }),
    );

    if (development) {
        _plugins.push(new BundleAnalyzerPlugin());
    }

    return _plugins;
}

module.exports.config = config;
module.exports.plugins = generatePlugin();
