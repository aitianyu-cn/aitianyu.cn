/**@format */

const entryProcessor = require("./webpack/entry-page-processor");
const entriesAndPages = entryProcessor.processor();

const entryHandler = require("./webpack/entry-handler");
const outputHandler = require("./webpack/output-handler");
const modulesHandler = require("./webpack/modules-handler");
const optimizationHandler = require("./webpack/optimization-handler");
const pluginHandler = require("./webpack/plugin-handler");
const resolveHandler = require("./webpack/resolve-handler");
const developServerHandler = require("./webpack/dev-server-handler");

const numericChecker = require("./common/numeric-checker");

const ENVIRONMENT = require("../../environment");

module.exports = {
    entry: entryHandler.handler(entriesAndPages.chunks),
    output: outputHandler.handler(),
    module: modulesHandler.handler(),
    optimization: optimizationHandler.handler(),
    plugins: pluginHandler.handler(entriesAndPages.pages),
    resolve: resolveHandler.handler(),
    mode: ENVIRONMENT.mode || "development",
    devtool: ENVIRONMENT.mode === "development" ? "source-map" : false,
    watchOptions: {
        poll: numericChecker.check(ENVIRONMENT.watchOptions.poll) || 1000,
        aggregateTimeout: numericChecker.check(ENVIRONMENT.watchOptions.aggregateTimeout) || 1000,
        ignored: ENVIRONMENT.watchOptions.ignore,
    },
    devServer: developServerHandler.handler(),
    performance: {
        hints: "warning",
        maxEntrypointSize: 50000000,
        maxAssetSize: 30000000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith(".js");
        },
    },
};
