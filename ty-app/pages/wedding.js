/**@format */

const pageInfo = {
    timer: {
        title: "LOVE & YOU",
        template: "html/index.html",
        filename: "application/wedding/index.html",
        favicon: "html/aitianyu.ico",
        chunks: ["application/wedding"],
        from: [
            {
                regexp: /^\/application\/daily\/timer$/,
                hash: null,
            },
        ],
    },
};

module.exports = function () {
    return pageInfo;
};
