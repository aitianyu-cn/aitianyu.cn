/**@format */

const errorPages = require("./page.error");
const appPages = require("./page.app");

module.exports = {
    home: {
        title: "个人编程学习",
        template: "index/index.html",
        filename: "index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["global/home"],
        from: [
            {
                regexp: /^\/$/,
                hash: null,
            },
        ],
        tianyuShell: {
            coreSupport: true,
            config: {
                language: true,
                ui: {
                    message: true,
                    dialog: true,
                    background: true,
                },
                storage: true,
                featureToggle: true,
                performance: true,
            },
        },
    },
    imageSelector: {
        title: "图片选择器",
        template: "app/index.html",
        filename: "application/image/selector/index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["application/imageSelector"],
        from: [
            {
                regexp: /^\/application\/image\/selector$/,
                hash: null,
            },
        ],
        tianyuShell: {
            coreSupport: true,
            config: {
                language: true,
                ui: {
                    message: true,
                    dialog: true,
                    background: true,
                },
                storage: true,
                featureToggle: true,
                performance: true,
            },
        },
    },
    adminConsole: {
        title: "Tianyu-Shell",
        template: "index/index.html",
        filename: "admin/index.html",
        favicon: "src/page/index/index_favicon.ico",
        chunks: [],
        from: [
            {
                regexp: /^\/admin$/,
                hash: null,
            },
        ],
    },
    adminLogon: {
        title: "Tianyu-Shell",
        template: "index/index.html",
        filename: "admin/logon.html",
        favicon: "src/page/index/index_favicon.ico",
        chunks: [],
        from: [],
    },
    ...errorPages(),
    ...appPages(),
};
