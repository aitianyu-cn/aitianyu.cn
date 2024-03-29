/**@format */

const path = require("path");
const numericChecker = require("../common/numeric-checker");

const PATH_HANDLER = require("../common/path-handler");
const ENVIRONMENT = require("../../../environment");
const PROXY = require("../../../proxy");
const REMOTE_SERVERS = require("../../../ty-infra/server/remote-servers");

const historyApiFallback = {
    rewrites: [],
};

function devServerStaticFiles() {
    const statics = [];
    for (const staticKey of Object.keys(ENVIRONMENT.config.statics)) {
        statics.push({
            directory: path.resolve(PATH_HANDLER.PROJECT_ROOT, ENVIRONMENT.config.statics[staticKey]),
            publicPath: `/${staticKey}`,
        });
    }

    return statics;
}

function devProxyTranslator() {
    const proxy = {};
    for (const server of Object.keys(REMOTE_SERVERS)) {
        const remote = REMOTE_SERVERS[server];
        const proxyInfo = PROXY[server];
        if (remote && proxyInfo) {
            proxy[remote] = proxyInfo;
        }
    }

    return proxy;
}

module.exports.handler = function () {
    const envHost = numericChecker.check(ENVIRONMENT.devServer.host);
    const envPort = numericChecker.check(ENVIRONMENT.devServer.port);

    const devHost = envHost || process.env.DEV_SERVER_HOST || "0.0.0.0";
    const devPort = envPort || process.env.DEV_SERVER_PORT || 8080;

    const config = {
        proxy: devProxyTranslator(),
        historyApiFallback: historyApiFallback,
        compress: ENVIRONMENT.mode !== "development",
        hot: ENVIRONMENT.mode === "development",
        static: devServerStaticFiles(),
        host: devHost,
        port: devPort,
        allowedHosts: "all",
    };

    return config;
};
