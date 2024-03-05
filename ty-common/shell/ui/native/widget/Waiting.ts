/**@format */

import { guid } from "@aitianyu.cn/types";
import * as MessageBundle from "../../../i18n/MessageBundle";
import { isMobile } from "@aitianyu.cn/tianyu-shell/core";

import "../../css/waitingDialog.css";

const WAITING_DIALOG_IMG = require("../../res/waiting.gif").default;

export class WaitingDialog {
    private waitingText: string;

    private constructor(text: string) {
        this.waitingText = text;
    }

    public render(): HTMLElement {
        return isMobile ? this.renderMob() : this.renderNor();
    }

    private renderMob(): HTMLElement {
        const content = document.createElement("div");
        content.classList.add("wait_dialog_b");

        const header = document.createElement("h4");
        header.classList.add("wait_dialog_t");
        header.textContent = this.waitingText || MessageBundle.getText("WAITING_DIALOG_TEXT");

        content.appendChild(header);

        return content;
    }

    private renderNor(): HTMLElement {
        const content = document.createElement("div");
        content.classList.add("wait_dialog_b");

        const img = document.createElement("img");
        img.classList.add("wait_dialog_ai");
        img.src = WAITING_DIALOG_IMG;
        img.alt = MessageBundle.getText("WAITING_DIALOG_AI_ALT");

        const header = document.createElement("h4");
        header.classList.add("wait_dialog_t", "wait_dialog_t_anm");
        header.textContent = this.waitingText || MessageBundle.getText("WAITING_DIALOG_TEXT");

        content.appendChild(img);
        content.appendChild(header);

        return content;
    }

    public static withDialog(fnRunner: () => Promise<any>, text?: string): void {
        const dialogId: string = guid();
        const dialog = new WaitingDialog(text || "");
        const content = dialog.render();
        content.id = dialogId;

        document.body.appendChild(content);
        console.log("load start");

        const runnerPromise = fnRunner();

        const fnFinishWait = () => {
            document.body.removeChild(content);
            console.log("load done");
        };

        runnerPromise.finally(fnFinishWait);
    }
}
