/**@format */

import React from "react";
import { Configure } from "src/dty/core/Configure";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/request.waiting.css";
import { RequestWaitingTimeoutDialog } from "./res/RequestWaitingTimeOut";

const DefaultWaitingOvertime = 30000;

export class RequestWaiting extends TYViewComponent {
    private Overtime: number;
    private timer: number;

    public constructor(props: IShellProperty) {
        super(props);

        this.Overtime = DefaultWaitingOvertime;
        this.timer = 0;
    }

    public setOverTime(time: number): void {
        this.Overtime = time < DefaultWaitingOvertime ? DefaultWaitingOvertime : time;
    }

    public componentDidMount(): void {
        const config = Configure.generateConfigure();
        config.addTrigger("Request_Waiting_Timeout_Dialog_Cancel_Wait", this.onTimeoutCancel.bind(this));
        config.addTrigger("Request_Waiting_Timeout_Dialog_Continue_Wait", this.onTimeoutContinue.bind(this));

        this.timer = window.setTimeout(this.onWaitTimeout.bind(this), this.Overtime);
    }

    public componentWillUnmount(): void {
        const config = Configure.generateConfigure();
        config.removeTrigger("Request_Waiting_Timeout_Dialog_Cancel_Wait");
        config.removeTrigger("Request_Waiting_Timeout_Dialog_Continue_Wait");

        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = 0;
        }
    }

    public render(): React.ReactNode {
        return (
            <div className="request_waiting_base">
                <img
                    className="request_waiting_base_ai"
                    src="assert/anim/waiting.png"
                    alt={this.msgBundle.getI18n("REQUEST_WAITING_PAGE_AI")}
                />
                <h4 className="request_waiting_base_text">{this.msgBundle.getI18n("REQUEST_WAITING_PAGE_TEXT")}</h4>
            </div>
        );
    }

    private onWaitTimeout(): void {
        if (this.timer) {
            window.clearTimeout(this.timer);
        }

        const config = Configure.generateConfigure();
        config.trigger("Message_Dialog_Open", { obj: RequestWaitingTimeoutDialog, msgBundle: this.msgBundle });
    }

    private onTimeoutCancel(): void {
        const config = Configure.generateConfigure();
        config.trigger("Message_Dialog_Close", { obj: "Dynamic Page Timeout Cancel" });

        window.location.reload();
    }

    private onTimeoutContinue(): void {
        const config = Configure.generateConfigure();
        config.trigger("Message_Dialog_Close", { obj: "Dynamic Page Timeout Cancel" });

        this.timer = window.setTimeout(this.onWaitTimeout.bind(this), this.Overtime);
    }
}
