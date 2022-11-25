/**@format */

module.exports.extensions = [".ts", ".js", ".css", ".view.json", ".i18n.js", ".tsx", "png", "svg"];

module.exports.proxy = {
    "/remote-generic": {
        target: "http://server.tencent.backend.aitianyu.cn:9000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-generic": "",
        },
    },
    "/remote-project": {
        target: "http://server.tencent.backend.aitianyu.cn:9001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-project": "",
        },
    },
    "/remote-authorization": {
        target: "http://server.tencent.backend.aitianyu.cn:9010",
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
