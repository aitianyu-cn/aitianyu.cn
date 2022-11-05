/**@format */

import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";
import { initUIBase, theme } from "./Utilities";

export {};

function initiation(): void {
    initUIBase();

    if (!!!tianyuShell.core.ui) {
        tianyuShell.core.ui = {
            theme: theme,
        };
    }
    tianyuShell.core.ui.major = {};

    const div = document.createElement("div");
    div.id = TIANYU_SHELL_UI_MAJOR_ID;
    div.classList.add(...["ts_ui_major"]);

    document.body.appendChild(div);
}

initiation();
