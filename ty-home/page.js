/**@format */

const homePageDef = {
    title: "个人编程学习",
    template: "html/index.html",
    filename: "index.html",
    favicon: "html/aitianyu.ico",
    chunks: ["global/home"],

    // for dev part
    from: [
        {
            regexp: /^\/$/,
            hash: null,
        },
    ],
};

const errorPages = require("./pages/error-page");

module.exports = {
    home: homePageDef,
    ...errorPages(),
};
