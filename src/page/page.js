/**@format */

const errorPages = require("./page.error");

module.exports = {
    home: {
        title: "个人编程学习",
        template: "index/index.html",
        filename: "index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["homePage"],
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
    userHome: {
        title: "Tianyu-Shell",
        template: "index/index.html",
        filename: "user/index.html",
        favicon: "src/page/index/index_favicon.ico",
        chunks: [],
        from: [
            {
                regexp: /^\/user$/,
                hash: null,
            },
        ],
    },
    logon: {
        title: "Tianyu-Shell",
        template: "index/index.html",
        filename: "user/logon.html",
        favicon: "src/page/index/index_favicon.ico",
        chunks: [],
        from: [],
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
};
