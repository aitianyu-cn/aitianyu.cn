/**@format */

module.exports = {
    AITIANYU_CN_GENERIC_SERVER: {
        target: "http://server.tencent.backend.aitianyu.cn:9000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-generic": "",
        },
    },
    AITIANYU_CN_PROJECT_SERVER: {
        target: "http://server.tencent.backend.aitianyu.cn:9001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-project": "",
        },
    },
    AITIANYU_CN_USER_SERVER: {
        target: "http://server.tencent.backend.aitianyu.cn:9010",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-authorization": "",
        },
    },
    AITIANYU_CN_IMAGE_SELECTOR_SERVER: {
        target: "http://127.0.0.1:9200",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-imageSelector": "",
        },
    },
    AITIANYU_CN_DAILY_SERVER: {
        target: "http://server.tencent.backend.aitianyu.cn:9300",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-daily": "",
        },
    },
    AITIANYU_CN_WEDDING_SERVER: {
        target: "http://server.tencent.backend.aitianyu.cn:9400",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-wedding": "",
        },
    },
};
