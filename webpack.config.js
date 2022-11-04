/**@format */

const { checkNumeric } = require("./tools/webpack/utilities");
const { handleEntries, handleResolve, handleOutput } = require("./tools/webpack/handler");

const { pluginsGenerator } = require("./tools/webpack/pluginHelper");
const webpackEnvSetting = require("./tools/config/devEnv");
const modules = require("./tools/webpack/modules");
const devServer = require("./tools/webpack/devServer");

const tianyuPagesAndEntriesGenerater = require("./tools/webpack/entries");

const baseDir = __dirname;
const pagesAndEntries = tianyuPagesAndEntriesGenerater();

const optimize = {
    splitChunks: {
        chunks: "initial",
        minSize: 0,
        maxSize: 30000,
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
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
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
        { dir: baseDir, port: checkNumeric(webpackEnvSetting.devServer.port) || 1000 },
        pagesAndEntries.fallback,
    ),
};
