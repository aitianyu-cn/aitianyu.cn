/**@format */

import { ShellUIElement } from "tianyu-shell/ui/native/ShellUIElement";
import { require_msgbundle } from "ts-core/I18n";
import { CallbackActionT } from "ts-core/Types";

export interface IMessageDialogProperty {
    text: string;
    ok?: boolean;
    cancel?: boolean;
    custom?: string[];
    onClick?: CallbackActionT<string>;
}

export class MessageDialog extends ShellUIElement {
    private props: IMessageDialogProperty;
    private dialogId: string;

    public constructor(props: IMessageDialogProperty) {
        super();

        this.props = props;
        this.dialogId = "";
    }

    public setDialogId(id: string): void {
        this.dialogId = id;
    }

    public override render(): HTMLElement {
        const messageBundle = require_msgbundle("base", "widget");

        const basicContainer = document.createElement("div");
        basicContainer.style.height = "fit-content";
        basicContainer.style.width = "fit-content";
        basicContainer.style.maxWidth = "100vw";
        // content.style.display = "flex";
        basicContainer.style.marginLeft = "auto";
        basicContainer.style.marginRight = "auto";

        // content
        const content = document.createElement("div");
        content.style.height = "fit-content";
        content.style.width = "fit-content";
        content.style.maxWidth = "100%";
        // content.style.display = "flex";
        content.style.padding = "15px";
        content.style.backgroundColor = "var(--ts_ui_dialog_content_bgc)";
        content.style.boxShadow = "var(--ts_ui_dialog_content_sdc) 0px 0px 10px";
        content.style.borderRadius = "15px";

        // message content
        const messageContent = document.createElement("div");
        messageContent.style.color = "var(--ts_ui_blk_4)";
        messageContent.style.height = "fit-content";
        messageContent.style.width = "fit-content";
        messageContent.style.display = "flex";
        messageContent.style.marginLeft = "auto";
        messageContent.style.marginRight = "auto";
        messageContent.style.userSelect = "none";
        messageContent.style.marginTop = "5px";
        messageContent.style.paddingBottom = "10px";

        // message text
        const message = document.createElement("h2");
        message.textContent = this.props.text;
        message.style.margin = "auto";

        messageContent.appendChild(message);

        //////////////////////////////////////////////////
        // create buttons
        //////////////////////////////////////////////////
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.maxWidth = "100%";
        buttonContainer.style.width = "fit-content";
        buttonContainer.style.height = "max-content";
        buttonContainer.style.marginLeft = "auto";
        buttonContainer.style.marginRight = "auto";
        buttonContainer.style.paddingTop = "10px";
        buttonContainer.style.marginBottom = "5px";
        buttonContainer.style.flexWrap = "wrap";

        const onClickBase = (type: string) => {
            if (!!this.dialogId) {
                tianyuShell.core.ui?.dialog?.close(this.dialogId);
            }

            this.props.onClick?.(type);
        };
        const hasButton: boolean = !!this.props.ok || !!this.props.cancel || !!this.props.custom;
        if (!hasButton || !!this.props.ok) {
            const button = MessageDialog.renderButtons(messageBundle.getText("MESSAGE_DIALOG_DEFAULT_BUTTON_OK"));
            button.onclick = () => {
                onClickBase("ok");
            };
            buttonContainer.appendChild(button);
        }
        if (!!this.props.cancel) {
            const button = MessageDialog.renderButtons(messageBundle.getText("MESSAGE_DIALOG_DEFAULT_BUTTON_CANCEL"));
            button.onclick = () => {
                onClickBase("cancel");
            };
            buttonContainer.appendChild(button);
        }
        for (const btext of this.props.custom || []) {
            const button = MessageDialog.renderButtons(btext);
            button.onclick = () => {
                onClickBase(btext);
            };
            buttonContainer.appendChild(button);
        }

        //////////////////////////////////////////////////

        // add all child nodes
        content.appendChild(messageContent);
        content.appendChild(buttonContainer);

        basicContainer.appendChild(content);
        return basicContainer;
    }

    private static renderButtons(text: string): HTMLElement {
        const content = document.createElement("button");
        content.type = "button";
        content.style.width = "fit-content";
        content.style.height = "fit-content";
        content.style.backgroundColor = "var(--ts_ui_blk_5)";
        content.style.color = "var(--ts_ui_blk_1)";
        content.style.borderRadius = "5px";
        content.style.border = "none";
        content.style.margin = "10px";

        const inner = document.createElement("h3");
        inner.style.margin = "auto";
        inner.style.userSelect = "none";
        inner.style.padding = "5px";
        inner.innerText = text;

        content.appendChild(inner);
        return content;
    }

    public static openDialog(props: IMessageDialogProperty): void {
        if (!tianyuShell.core.ui?.dialog) {
            return;
        }

        const dialog = new MessageDialog(props);
        const content = dialog.render();
        const dialogId = tianyuShell.core.ui.dialog.open(content);
        if (!!!dialogId) {
            // dialog is not opened successfully, return directly.
            return;
        }
        // if open successfully, set the dialog id
        dialog.setDialogId(dialogId);
    }
}
