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
    "/remote-project": {
        target: "http://localhost:9001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-project": "",
        },
    },
    "/remote-generic": {
        target: "http://localhost:9000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-generic": "",
        },
    },
    "/remote-authorization": {
        target: "http://localhost:9010",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-authorization": "",
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
