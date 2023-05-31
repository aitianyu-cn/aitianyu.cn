/**@format */

const pageInfo = {
    timer: {
        title: "倒计时",
        template: "app/index.html",
        filename: "application/daily/timer/index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["application/daily/timer"],
        from: [
            {
                regexp: /^\/application\/daily\/timer$/,
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
};

module.exports = function () {
    return pageInfo;
};
