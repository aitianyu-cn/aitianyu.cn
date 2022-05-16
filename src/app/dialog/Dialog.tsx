/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { Configure, ITriggerData } from "../../dty/common/core/Configure";
import { IEventListener } from "../../dty/common/model/Events";
import { IMessageBundle } from "../../dty/common/model/IMessageBundle";
import { HTMLParse } from "../../dty/frame/shell/HTMLParse";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/dialog.main.css";
import { MsgBundle } from "./MsgBundle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Dialog extends React.Component<IShellProperty, IShellState> implements IEventListener<ITriggerData> {
    private view: React.ReactNode;
    private buttons: React.ReactNode[];

    private msgBundle: MsgBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.view = null;
        this.buttons = [];

        this.msgBundle = MsgBundle.generateHelper();
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
        config.removeTrigger("global_message_dialog_open");
        config.removeTrigger("global_message_dialog_close");
    }

    private renderDialogPage(): React.ReactNode {
        const config = Configure.generateConfigure();
        config.addTrigger("global_message_dialog_open", this);
        config.addTrigger("global_message_dialog_close", this);

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
    public fire(event: ITriggerData, _sender?: any): void {
        if (typeof event.obj === "string") {
            if (event.obj === "close") {
                this.closeDialog();
            } else if (event.obj === "show") {
                alert("show");
            }
        } else {
            const msgBundle = event.msgBundle;
            this.openDialog(event.obj ?? event, msgBundle);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public removed(_sender?: any): void {
        // no hand
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private openDialog(data: string | any, msgbundle?: IMessageBundle): void {
        const useRaw = typeof data === "string";
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const source = data;
        const htmlParse = !useRaw ? new HTMLParse(source, msgbundle) : null;

        this.view = htmlParse?.getView() || source;
        this.buttons = this.getButtons(
            htmlParse && htmlParse.getButtons().length !== 0
                ? htmlParse.getButtons()
                : [
                      <div
                          key="dialog_default_close_button"
                          id="dialog_default_close_button"
                          className="global_message_dialog_button"
                          onClick={this.closeDialog.bind(this)}>
                          <div
                              className={
                                  isMobile ? "global_message_dialog_button_content_mob" : "global_message_dialog_button_content"
                              }>
                              {this.msgBundle.getI18nText("DIALOG_PAGE_CLOSE_BUTTON")}
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

    private closeDialog(): void {
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
}
