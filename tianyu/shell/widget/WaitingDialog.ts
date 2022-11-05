/**@format */

import { ShellUIElement } from "tianyu-shell/ShellUIElement";
import { require_msgbundle } from "ts-core/I18n";
import { CallbackAction } from "ts-core/Types";

import "./css/waitingDialog.css";

export interface IWaitingDialogOption {
    overtime: number;
    onOvertime: CallbackAction;
}

export class WaitingDialog extends ShellUIElement {
    private waitingText: string;

    public constructor(text: string) {
        super();
        this.waitingText = text;
    }

    public override render(): HTMLElement {
        const messageBundle = require_msgbundle("base", "widget");

        const content = document.createElement("div");
        content.classList.add("wait_dialog_b");

        const themeColor =
            (tianyuShell.core.ui?.theme.custom.theme && tianyuShell.core.ui?.theme.custom.color) ||
            tianyuShell.core.ui?.theme.default.color ||
            "dark";
        const img = document.createElement("img");
        img.classList.add("wait_dialog_ai");
        img.src = `static/res/widget/waiting-${themeColor}.gif`;
        img.alt = messageBundle.getText("WAITING_DIALOG_AI_ALT");

        const header = document.createElement("h4");
        header.classList.add("wait_dialog_t");
        header.textContent = this.waitingText || messageBundle.getText("WAITING_DIALOG_TEXT");

        content.appendChild(img);
        content.appendChild(header);

        return content;
    }

    public static withDialog(fnRunner: () => Promise<any>, options?: IWaitingDialogOption): void {
        const isGlobalDialogValid: boolean = !!tianyuShell.core.ui?.dialog;

        let dialogId: string = "";
        if (isGlobalDialogValid) {
            // to open the global dialog
            const dialog = new WaitingDialog("");
            const content = dialog.render();
            dialogId = tianyuShell.core.ui?.dialog?.open(content) || "";
        }

        const runnerPromise = fnRunner();
        const waitingTimeover = options?.overtime;

        let waitingTimer: number | undefined;
        let fnResolve: CallbackAction | null = null;
        const fnWaitingTimeout = () => {
            const messageBundle = require_msgbundle("base", "widget");
            const result = window.confirm(messageBundle.getText("WAITING_DIALOG_TIMEOUT_CONFIRM"));
            if (result) {
                waitingTimer = window.setTimeout(fnWaitingTimeout, waitingTimeover);
            } else {
                waitingTimer = undefined;
                options?.onOvertime?.();
                fnResolve?.();
            }
        };
        let timeoutPromise: Promise<void> | undefined;
        if (waitingTimeover) {
            timeoutPromise = new Promise<void>((resolve) => {
                fnResolve = resolve;
                if (waitingTimeover) {
                    waitingTimer = window.setTimeout(fnWaitingTimeout, waitingTimeover);
                }
            });
        }

        let isFinish = false;
        const fnFinishWait = () => {
            if (isFinish) return;

            isFinish = true;
            if (!!waitingTimer) {
                window.clearTimeout(waitingTimer);
            }

            if (isGlobalDialogValid && dialogId) {
                tianyuShell.core.ui?.dialog?.close(dialogId);
            }
        };

        runnerPromise.finally(fnFinishWait);
        timeoutPromise?.finally(fnFinishWait);
    }
}
