/**@format */

const env = require("../../../environment");
const path = require("path");

const webpackConfigs = require("../../../webpack/config");
const proxyData = webpackConfigs.proxy;
const staticData = webpackConfigs.static;

const historyApiFallback = {
    rewrites: [],
};

const devServerStatic = function (dir) {
    const staticSrc = [];

    if (Array.isArray(staticData)) {
        for (const item of staticData) {
            staticSrc.push({
                directory: path.resolve(dir, "src", item.directory),
                publicPath: item.publicPath,
            });
        }
    }

    return staticSrc;
};

module.exports.generator = function getDevServer(option, fallback) {
    option = option || {};

    const devHost = option.host || process.env.DEV_SERVER_HOST || "0.0.0.0";
    const devPort = option.port || process.env.DEV_SERVER_PORT || 8080;
    const dir = option.dir || __dirname;

    const config = {
        proxy: proxyData || {},
        historyApiFallback: fallback || historyApiFallback,
        compress: env.mode !== "development",
        hot: env.mode === "development",
        static: devServerStatic(dir),
        host: devHost,
        port: devPort,
    };

    return config;
};
