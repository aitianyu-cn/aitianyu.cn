/**@format */

const COMMON_TITLE = "Error-Page";
const BASIC_TEMPLATE_FILE = "error/error.html";
const ERROR_PAGE_CHUNKS = ["error"];
const ERROR_PAGE_PATH = "error";
const ERROR_PAGE_ICON = "";

const ERROR_CODES = {
    404: {
        from: [
            {
                regexp: /./,
                hash: 404,
            },
            {
                regexp: /^\/error\/404$/,
                hash: "",
            },
        ],
    },
    500: {
        from: [
            {
                regexp: /^\/error\/500$/,
                hash: "",
            },
        ],
    },
    502: {
        from: [
            {
                regexp: /^\/error\/402$/,
                hash: "",
            },
        ],
    },
};

module.exports = function () {
    const exportPages = {};

    for (const errorCode of Object.keys(ERROR_CODES)) {
        if (!!!ERROR_CODES[errorCode]) continue;

        const page = {
            title: COMMON_TITLE,
            template: BASIC_TEMPLATE_FILE,
            filename: `${ERROR_PAGE_PATH}/${errorCode}.html`,
            chunks: ERROR_PAGE_CHUNKS,
            from: ERROR_CODES[errorCode].from || [],
            errorCode: errorCode,
            favicon: ERROR_PAGE_ICON,
        };

        exportPages[`error_${errorCode}`] = page;
    }

    return exportPages;
};
