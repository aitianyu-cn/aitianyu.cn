/**@format */

import { TIANYU_SHELL_UI_BACKGROUND_ID } from "ts-core/UI";

export {};

function initiation(): void {
    if (tianyuShell.core.ui) {
        tianyuShell.core.ui.background = {};
    }

    const div = document.createElement("div");
    div.classList.add("ts_ui_bg");
    div.id = TIANYU_SHELL_UI_BACKGROUND_ID;

    document.body.appendChild(div);
}

initiation();
