/**@format */

import "./css/search.empty.css";

export const SearchEmptyDialog = {
    buttons: [],
    view: {
        id: "download_search_empty_dialog_view",
        class: "download_search_empty_dialog_view",
        type: "div",
        children: [
            {
                id: "download_search_empty_dialog_view_content",
                class: "download_search_empty_dialog_view_content",
                content: "I18N=DOWNLOAD_DIALOG_EMPTY_SEARCH",
                type: "div",
            },
        ],
    },
};

export const SearchNotSupportDialog = {
    buttons: [],
    view: {
        id: "download_search_empty_dialog_view",
        class: "download_search_empty_dialog_view",
        type: "div",
        children: [
            {
                id: "download_search_empty_dialog_view_content",
                class: "download_search_empty_dialog_view_content",
                content: "I18N=DOWNLOAD_DIALOG_NOT_SUPPORT_SEARCH",
                type: "div",
            },
        ],
    },
};
