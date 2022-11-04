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

module.exports = {
    index: {
        title: "Tianyu-Shell",
        template: "index.html",
        filename: "index.html",
        favicon: "tianyu/page/index_favicon.ico",
        chunks: ["main"],
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
    error: {
        title: "Error-Page",
        template: "error.html",
        filename: "error.html",
        chunks: ["error"],
        from: [
            {
                regexp: /./,
                hash: 404,
            },
        ],
    },
};
