/**@format */

/**
 * template:
 *
 * {page id}: {
 *      title: {the html title for the page},
 *      template: {the basic html file of this page},
 *      filename: {the output file name of this page},
 *      chunks: [{the list of the chunks which need to be used and need to be loaded in the first time}],
 *      from: [{define the html fallback path}],
 *      tianyuShell: {  // this is a selectable item for more additional default chunks
 *          coreSupport: boolean - set the page whether needs to use tianyu-shell core.
 *          config: {
 *              ui: {
 *                  message: boolean - to define the message layer should be included.
 *                  dialog: boolean - to define the dialog layer should be included.
 *                  background: boolean - to define the background layer should be included.
 *              },
 *              storage: boolean - to define the global storage supporting should be included.
 *              featureToggle: boolean - to define the feature toggle supporting should be included.
 *          }
 *      }
 * }
 */

const errorPages = require("./page.error");

module.exports = {
    home: {
        title: "个人编程学习",
        template: "index/index.html",
        filename: "index.html",
        favicon: "tianyu/page/res/aitianyu.ico",
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
        favicon: "tianyu/page/index/index_favicon.ico",
        chunks: ["main"],
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
        favicon: "tianyu/page/index/index_favicon.ico",
        chunks: ["main"],
        from: [],
    },
    adminConsole: {
        title: "Tianyu-Shell",
        template: "index/index.html",
        filename: "admin/index.html",
        favicon: "tianyu/page/index/index_favicon.ico",
        chunks: ["main"],
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
        favicon: "tianyu/page/index/index_favicon.ico",
        chunks: ["main"],
        from: [],
    },
    ...errorPages(),
};
