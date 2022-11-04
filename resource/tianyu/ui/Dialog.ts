/**@format */

import { initUIBase, theme } from "./Utilities";

export {};

function initiation(): void {
    initUIBase();

    if (!!!tianyuShell.core.ui) {
        tianyuShell.core.ui = {
            theme: theme,
        };
    }
    tianyuShell.core.ui.dialog = {};

    const div = document.createElement("div");
    div.id = "tianyu_shell_ui_dialog";

    document.body.appendChild(div);
}

initiation();
