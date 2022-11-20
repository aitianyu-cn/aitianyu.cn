/**@format */

module.exports.extensions = [".ts", ".js", ".css", ".view.json", ".i18n.js", ".tsx", "png", "svg"];

module.exports.proxy = {
    "/remote-connection": {
        target: "http://aitianyu.cn",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-connection": "",
        },
    },
    "/remote-connection-test": {
        target: "http://aitianyu.cn",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-connection-test": "",
        },
    },
    "/remote-user-server": {
        target: "http://localhost:9010",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-user-server": "",
        },
    },
    "/remote-global-server": {
        target: "http://localhost:9000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-global-server": "",
        },
    },
    "/remote-assist-server": {
        target: "http://localhost:9001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-assist-server": "",
        },
    },
    "/remote-project-server-docs": {
        target: "http://localhost:9020",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-project-server-docs": "",
        },
    },
    "/remote-project-server-download": {
        target: "http://localhost:9021",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-project-server-download": "",
        },
    },
};

module.exports.static = [
    {
        directory: "public",
        publicPath: "/public",
    },
    {
        directory: "static",
        publicPath: "/static",
    },
];

module.exports.resolve = {
    fallback: {},
};
