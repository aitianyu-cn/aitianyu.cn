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
