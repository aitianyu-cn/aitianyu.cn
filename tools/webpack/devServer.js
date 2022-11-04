/**@format */

const env = require("../config/devEnv");
const path = require("path");

const proxyData = require("../config/webpack/proxy.json");

const historyApiFallback = {
    rewrites: [],
};

const devServerStatic = function (dir) {
    const staticSrc = [
        {
            directory: path.join(dir, "public"),
            publicPath: "/public",
        },
        {
            directory: path.join(dir, "static"),
            publicPath: "/static",
        },
    ];

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
