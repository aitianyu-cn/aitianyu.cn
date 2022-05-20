/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { Configure, ITriggerData } from "src/dty/core/Configure";
import { HTMLParse } from "src/dty/HTMLParse";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/dialog.main.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Dialog extends TYViewComponent {
    private view: React.ReactNode;
    private buttons: React.ReactNode[];

    public constructor(props: IShellProperty) {
        super(props);

        this.view = null;
        this.buttons = [];

        const config = Configure.generateConfigure();
        config.addTrigger("Message_Dialog_Open", this.openDialog.bind(this));
        config.addTrigger("Message_Dialog_Close", this.closeDialog.bind(this));
    }

    public render(): React.ReactNode {
        return (
            <div id="global_message_dialog" className="global_message_dialog_bage">
                {this.renderDialogPage()}
            </div>
        );
    }

    public componentWillUnmount(): void {
        const config = Configure.generateConfigure();
        config.removeTrigger("Message_Dialog_Open");
        config.removeTrigger("Message_Dialog_Close");
    }

    private renderDialogPage(): React.ReactNode {
        return (
            <div className="global_message_dialog_inner">
                <div className="global_message_dialog_panel">
                    <div id="dialog_data" className="global_message_dialog_data">
                        {this.view}
                    </div>
                    <div className="global_message_dialog_buttons_container">
                        <div className="global_message_dialog_buttons">{this.buttons}</div>
                    </div>
                </div>
            </div>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private openDialog(event: ITriggerData, _sender?: any): void {
        const useRaw = typeof event.obj === "string";
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const source = event.obj;
        const htmlParse = !useRaw ? new HTMLParse(source, event.msgBundle) : null;

        this.view = htmlParse?.getView() || source;
        this.buttons = this.getButtons(
            htmlParse && htmlParse.getButtons().length !== 0
                ? htmlParse.getButtons()
                : [
                      <div
                          key="dialog_default_close_button"
                          id="dialog_default_close_button"
                          className="global_message_dialog_button"
                          onClick={this.onCloseDialog.bind(this)}>
                          <div
                              className={
                                  isMobile ? "global_message_dialog_button_content_mob" : "global_message_dialog_button_content"
                              }>
                              {this.msgBundle.getI18n("DIALOG_PAGE_CLOSE_BUTTON")}
                          </div>
                      </div>,
                  ],
        );

        const dialogPage = document.getElementById("global_message_dialog");
        if (!dialogPage) {
            return;
        }
        dialogPage.style.display = "grid";
        dialogPage.style.animation = "global_message_dialog_open 0.5s forwards";

        this.forceUpdate();
    }

    private getButtons(buttons: React.ReactNode[]): React.ReactNode[] {
        const newButtons: React.ReactNode[] = [];

        for (let index = 0; index < buttons.length; ++index) {
            newButtons.push(this.getButton(`dialog_default_customized_button_${index}`, buttons[index]));
        }

        return newButtons;
    }

    private getButton(id: string, content: React.ReactNode): React.ReactNode {
        return (
            <div
                id={id}
                className={isMobile ? "global_message_dialog_button_container_mob" : "global_message_dialog_button_container"}>
                {content}
            </div>
        );
    }

    private onCloseDialog(): void {
        const dialogPage = document.getElementById("global_message_dialog");
        if (!dialogPage) {
            return;
        }
        dialogPage.style.animation = "global_message_dialog_close 0.5s forwards";
        dialogPage.style.display = "none";

        this.view = null;
        this.buttons = [];

        this.forceUpdate();
    }

    private closeDialog(_event: ITriggerData, _sender?: any): void {
        this.onCloseDialog();
    }
}
