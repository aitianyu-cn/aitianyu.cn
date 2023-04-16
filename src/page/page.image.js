/**@format */

const pageInfo = {
    image: {
        title: "影像世界",
        template: "app/index.html",
        filename: "application/image/index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["application/image"],
        from: [
            {
                regexp: /^\/application\/image$/,
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
    imageGallery: {
        title: "影像展区",
        template: "app/index.html",
        filename: "application/image/gallery/index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["application/image/gallery"],
        from: [
            {
                regexp: /^\/application\/image\/gallery$/,
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
    imageEducate: {
        title: "影像学校",
        template: "app/index.html",
        filename: "application/image/educate/index.html",
        favicon: "src/page/res/aitianyu.ico",
        chunks: ["application/image/educate"],
        from: [
            {
                regexp: /^\/application\/image\/educate$/,
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
};

module.exports = function () {
    return pageInfo;
};
