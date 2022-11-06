/**@format */

import { guid } from "ts-core/Guid";
import { MapOfBoolean, MapOfString } from "ts-core/Types";
import { initUIBase, theme } from "./Utilities";

import "./common/dialog.css";
import { TIANYU_SHELL_DIALOG_BASIC_ID } from "ts-core/UI";

interface IDialogInformation {
    opened: boolean;
    openList: MapOfBoolean;
}

const _dialog_info: IDialogInformation = {
    opened: false,
    openList: {},
};

function _open_dialog(element: HTMLElement | string, id?: string): string {
    if (_dialog_info.opened) return "";

    _dialog_info.opened = true;
    const dialogId: string = id || guid();

    const dialog = document.getElementById(TIANYU_SHELL_DIALOG_BASIC_ID);
    if (!!!dialog) return "";

    const childContainer = document.createElement("div");
    childContainer.id = dialogId;
    childContainer.classList.add(...["ts_ui_dialog_in"]);
    if (typeof element === "string") {
        childContainer.innerHTML = element;
    } else {
        childContainer.appendChild(element);
    }

    dialog.appendChild(childContainer);

    dialog.style.display = "grid";
    dialog.style.animation = "ts_ui_dialog_open 0.5s forwards";

    _dialog_info.openList[dialogId] = true;
    return dialogId;
}

function _close_dialog(id: string): void {
    if (!!!_dialog_info.openList[id]) {
        return;
    }

    const dialog = document.getElementById(TIANYU_SHELL_DIALOG_BASIC_ID);
    if (dialog) {
        dialog.style.animation = "ts_ui_dialog_close 0.5s forwards";
        dialog.style.display = "none";

        dialog.innerHTML = "";
    }

    delete _dialog_info.openList[id];
    _dialog_info.opened = false;
}

function _is_dialog_opened(): boolean {
    return _dialog_info.opened;
}

function initiation(): void {
    initUIBase();

    if (!!!tianyuShell.core.ui) {
        tianyuShell.core.ui = {
            theme: theme,
        };
    }
    tianyuShell.core.ui.dialog = {
        open: _open_dialog,
        close: _close_dialog,
        isOpen: _is_dialog_opened,
    };

    const div = document.createElement("div");
    div.id = TIANYU_SHELL_DIALOG_BASIC_ID;
    div.classList.add(...["tianyu_shell_ui_dialog_mask", "ts_ui_dialog_mask"]);
    div.onclick = (ev: MouseEvent) => ev.stopPropagation();
    div.onmouseover = (ev: MouseEvent) => ev.stopPropagation();
    div.onmousedown = (ev: MouseEvent) => ev.stopPropagation();
    div.onmouseenter = (ev: MouseEvent) => ev.stopPropagation();
    div.onmouseleave = (ev: MouseEvent) => ev.stopPropagation();
    div.onmousemove = (ev: MouseEvent) => ev.stopPropagation();
    div.onmouseout = (ev: MouseEvent) => ev.stopPropagation();
    div.onmouseup = (ev: MouseEvent) => ev.stopPropagation();

    document.body.appendChild(div);
}

initiation();
