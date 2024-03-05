/**@format */

const COMMON_TITLE = "ERROE-PAGE";
const BASIC_TEMPLATE_FILE = "html/error.html";
const ERROR_PAGE_CHUNKS = "global/error";
const ERROR_PAGE_PATH = "global/error";
const ERROR_PAGE_ICON = "";

const ERROR_CODES = {
    400: {
        from: [
            {
                regexp: /^\/error\/400$/,
                hash: "",
            },
        ],
    },
    403: {
        from: [
            {
                regexp: /^\/error\/403$/,
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
                regexp: /^\/error\/502$/,
                hash: "",
            },
        ],
    },
    503: {
        from: [
            {
                regexp: /^\/error\/503$/,
                hash: "",
            },
        ],
    },
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
};

module.exports = function () {
    const exportPages = {};

    for (const errorCode of Object.keys(ERROR_CODES)) {
        if (!!!ERROR_CODES[errorCode]) continue;

        const page = {
            title: COMMON_TITLE,
            template: BASIC_TEMPLATE_FILE,
            filename: `${ERROR_PAGE_PATH}/${errorCode}.html`,
            chunks: [`${ERROR_PAGE_CHUNKS}_${errorCode}`],
            from: ERROR_CODES[errorCode].from || [],
            errorCode: errorCode,
            favicon: ERROR_PAGE_ICON,
        };

        exportPages[`error_${errorCode}`] = page;
    }

    return exportPages;
};
