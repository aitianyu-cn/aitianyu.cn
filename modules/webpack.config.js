/**@format */

const path = require("path");

const { checkNumeric } = require("./tianyu_shell/webpack/utilities");
const { handleEntries, handleResolve, handleOutput } = require("./tianyu_shell/webpack/handler");

const { pluginsGenerator } = require("./tianyu_shell/webpack/pluginHelper");
const webpackEnvSetting = require("../environment");
const modules = require("./tianyu_shell/webpack/modules");
const devServer = require("./tianyu_shell/webpack/devServer");
const tianyuPagesAndEntriesGenerater = require("./tianyu_shell/webpack/entries");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const baseDir = path.resolve(__dirname, "..");
const pagesAndEntries = tianyuPagesAndEntriesGenerater();

const optimize = {
    splitChunks: {
        chunks: "all",
        minSize: 100000,
        maxSize: 200000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: "~",
        name: false,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                filename: "common.[contenthash:6].js",
            },
            default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
};

module.exports = {
    entry: handleEntries(baseDir, pagesAndEntries.script),
    output: handleOutput(baseDir),
    module: {
        rules: modules.rules,
    },
    optimization: optimize,
    plugins: pluginsGenerator(baseDir, pagesAndEntries.pages),
    resolve: handleResolve(baseDir),
    mode: webpackEnvSetting.mode,
    devtool: webpackEnvSetting.mode === "development" ? "source-map" : false,
    watchOptions: {
        poll: checkNumeric(webpackEnvSetting.watchOptions.poll) || 1000,
        aggregateTimeout: checkNumeric(webpackEnvSetting.watchOptions.aggregateTimeout) || 1000,
        ignored: webpackEnvSetting.watchOptions.ignore,
    },
    devServer: devServer.generator(
        { dir: baseDir, port: checkNumeric(webpackEnvSetting.devServer.port) || 1000, host: webpackEnvSetting.devServer.host },
        pagesAndEntries.fallback,
    ),
    performance: {
        hints: "warning",
        maxEntrypointSize: 50000000,
        maxAssetSize: 30000000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith(".js");
        },
    },
};