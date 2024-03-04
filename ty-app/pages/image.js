/**@format */

const pageInfo = {
    image: {
        title: "影像世界",
        template: "html/index.html",
        filename: "application/image/index.html",
        favicon: "html/aitianyu.ico",
        chunks: ["application/image"],
        from: [
            {
                regexp: /^\/application\/image$/,
                hash: null,
            },
        ],
    },
    imageSelector: {
        title: "图片选择器",
        template: "html/index.html",
        filename: "application/image/selector/index.html",
        favicon: "html/aitianyu.ico",
        chunks: ["application/imageSelector"],
        from: [
            {
                regexp: /^\/application\/image\/selector$/,
                hash: null,
            },
        ],
    },
};

module.exports = function () {
    return pageInfo;
};
