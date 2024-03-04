/**@format */

const pageInfo = {
    timer: {
        title: "倒计时",
        template: "html/index.html",
        filename: "application/daily/timer/index.html",
        favicon: "html/aitianyu.ico",
        chunks: ["application/daily/timer"],
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
