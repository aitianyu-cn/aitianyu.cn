/**@format */

import { guid } from "@aitianyu.cn/types";
import { isMobile } from "@aitianyu.cn/tianyu-shell/core";
import * as MessageBundle from "ty-infra/i18n/MessageBundle";

import "ty-infra/ui/css/waitingDialog.css";
import { IWaitingDialogImage, IWaitingDialogOptions } from "ty-infra/ui/model/Waiting";

const WAITING_DIALOG_IMG = require("../../res/waiting.gif").default;

export class WaitingDialog {
    private waitingText?: string;

    protected waitingImg?: IWaitingDialogImage;
    protected options?: IWaitingDialogOptions;

    private constructor(text?: string, waitingImg?: IWaitingDialogImage, options?: IWaitingDialogOptions) {
        this.waitingText = text;
        this.waitingImg = waitingImg;
        this.options = options;
    }

    public render(): HTMLElement {
        return this.options?.onePlat || !isMobile ? this.renderNor() : this.renderMob();
    }

    private renderMob(): HTMLElement {
        const content = document.createElement("div");
        content.classList.add("wait_dialog_b");

        const header = document.createElement("h4");
        header.classList.add("wait_dialog_t");
        header.textContent = this.waitingText ?? MessageBundle.getText("WAITING_DIALOG_TEXT");

        content.appendChild(header);

        return content;
    }

    private renderNor(): HTMLElement {
        const content = document.createElement("div");
        content.classList.add("wait_dialog_b");

        let img;
        if (this.waitingImg?.type === "svg") {
            img = document.createElement("div");
            img.innerHTML = this.waitingImg.data;
        } else {
            img = document.createElement("img");
            img.src = this.waitingImg?.data ?? WAITING_DIALOG_IMG;
            img.alt = MessageBundle.getText("WAITING_DIALOG_AI_ALT");
        }
        if (this.options?.styles) {
            img.classList.add(...this.options?.styles);
        } else {
            img.classList.add("wait_dialog_ai");
        }

        const header = document.createElement("h4");
        if (this.options?.fontStyles) {
            header.classList.add(...this.options.fontStyles);
        } else {
            header.classList.add("wait_dialog_t", "wait_dialog_t_anm");
        }
        header.textContent = this.waitingText ?? MessageBundle.getText("WAITING_DIALOG_TEXT");

        content.appendChild(img);
        content.appendChild(header);

        return content;
    }

    public static withDialog(
        fnRunner: () => Promise<any>,
        text?: string,
        img?: IWaitingDialogImage,
        options?: IWaitingDialogOptions,
    ): void {
        const dialogId: string = guid();
        const dialog = new WaitingDialog(text, img, options);
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
