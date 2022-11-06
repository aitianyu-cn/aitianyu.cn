/**@format */

const BASIC_TEMPLATE_FILE = "app/index.html";
const APP_PAGE_PATH = "app";
const APP_PAGE_CHUNKS = ["app"];

const APPLICATIONS = {
    cloud: {
        chunks: ["app-cloud"],
        title: "Tianyu Cloud",
        favicon: "",
        from: [{ regexp: /^\/app\/cloud$/, hash: "" }],
    },
};

module.exports = function () {
    const _pages = {
        app: {
            title: "Tianyu Application",
            template: BASIC_TEMPLATE_FILE,
            filename: "app/index.html",
            favicon: "",
            chunks: APP_PAGE_CHUNKS,
            from: [
                {
                    regexp: /^\/app$/,
                    hash: null,
                },
            ],
        },
        appLogon: {
            title: "Tianyu Application",
            template: BASIC_TEMPLATE_FILE,
            filename: "app/logon.html",
            favicon: "",
            chunks: APP_PAGE_CHUNKS,
            from: [
                {
                    regexp: /^\/app$/,
                    hash: null,
                },
            ],
        },
    };

    for (const app of Object.keys(APPLICATIONS)) {
        if (!!!APPLICATIONS[app]) continue;

        const page = {
            title: app.title,
            template: BASIC_TEMPLATE_FILE,
            filename: `${APP_PAGE_PATH}/${app}/index.html`,
            favicon: APPLICATIONS[app].favicon,
            chunks: [...APP_PAGE_CHUNKS, ...APPLICATIONS[app].chunks],
            from: APPLICATIONS[app].from || [],
        };

        _pages[`app_${app}`] = page;
    }

    return _pages;
};
