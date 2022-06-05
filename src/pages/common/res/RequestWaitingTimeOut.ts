/**@format */

import "../css/request.waiting/timeout.css";

export const RequestWaitingTimeoutDialog = {
    hasButton: true,
    buttons: [
        {
            id: "continue_waiting",
            content: "I18N=REQUEST_WAITING_TIMEOUT_DIALOG_CONTINUE_WAIT",
            clickTrigger: "Request_Waiting_Timeout_Dialog_Continue_Wait",
            clickEvent: "waiting",
        },
        {
            id: "cancel_waiting",
            content: "I18N=REQUEST_WAITING_TIMEOUT_DIALOG_CANCEL_WAIT",
            clickTrigger: "Request_Waiting_Timeout_Dialog_Cancel_Wait",
            clickEvent: "continue",
        },
    ],
    view: {
        id: "request_waiting_timeout_dialog_view",
        class: "request_waiting_timeout_dialog_view",
        type: "div",
        children: [
            {
                id: "request_waiting_timeout_dialog_view_content",
                class: "request_waiting_timeout_dialog_view_content",
                content: "I18N=REQUEST_WAITING_IS_TIMEOUT",
                type: "div",
            },
        ],
    },
};
