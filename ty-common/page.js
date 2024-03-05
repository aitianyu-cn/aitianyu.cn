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

const dailyPages = require("./pages/app/daily");
const imagePages = require("./pages/app/image");
const weddingPages = require("./pages/app/wedding");

module.exports = {
    home: homePageDef,
    ...errorPages(),
    ...dailyPages(),
    ...imagePages(),
    ...weddingPages(),
};
