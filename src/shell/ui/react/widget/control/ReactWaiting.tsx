/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";

import "./css/react-waiting.css";

const isMob = isMobile();
const WaitingDialogImgDark = require("./res/waiting-dark.gif").default;
const WaitingDialogImgLight = require("./res/waiting-light.gif").default;
// const DefaultWaitingOvertime = 30000;

export interface IRequestWaitingProperty extends IReactControlProperty {}

export class ReactWaiting extends React.Component<IRequestWaitingProperty, IReactState> {
    // private Overtime: number;
    // private timer: number;

    public constructor(props: IRequestWaitingProperty) {
        super(props);

        // this.Overtime = DefaultWaitingOvertime;
        // this.timer = 0;
    }

    // public setOverTime(time: number): void {
    //     this.Overtime = time < DefaultWaitingOvertime ? DefaultWaitingOvertime : time;
    // }

    public componentDidMount(): void {
        // const config = ConfigureController.generateConfigure();
        // config.addTrigger("Request_Waiting_Timeout_Dialog_Cancel_Wait", this.onTimeoutCancel.bind(this));
        // config.addTrigger("Request_Waiting_Timeout_Dialog_Continue_Wait", this.onTimeoutContinue.bind(this));
        // this.timer = window.setTimeout(this.onWaitTimeout.bind(this), this.Overtime);
    }

    public componentWillUnmount(): void {
        // const config = ConfigureController.generateConfigure();
        // config.removeTrigger("Request_Waiting_Timeout_Dialog_Cancel_Wait");
        // config.removeTrigger("Request_Waiting_Timeout_Dialog_Continue_Wait");
        // if (this.timer) {
        //     window.clearTimeout(this.timer);
        //     this.timer = 0;
        // }
    }

    public render(): React.ReactNode {
        const messageBundle = require_msgbundle("view", "modules");
        const themeColor =
            (tianyuShell.core.ui?.theme.custom.theme && tianyuShell.core.ui?.theme.custom.color) ||
            tianyuShell.core.ui?.theme.default.color ||
            "dark";
        return (
            <div className="request_waiting_base">
                <img
                    className={isMob ? "request_waiting_base_ai_mob" : "request_waiting_base_ai"}
                    src={themeColor === "dark" ? WaitingDialogImgDark : WaitingDialogImgLight}
                    alt={messageBundle.getText("REQUEST_WAITING_PAGE_ALT")}
                />
                <h4 className={isMob ? "request_waiting_base_text_mob" : "request_waiting_base_text"}>
                    {messageBundle.getText("REQUEST_WAITING_PAGE_TEXT")}
                </h4>
            </div>
        );
    }

    // private onWaitTimeout(): void {
    //     if (this.timer) {
    //         window.clearTimeout(this.timer);
    //     }

    //     const config = ConfigureController.generateConfigure();
    //     config.trigger("Message_Dialog_Open", { obj: RequestWaitingTimeoutDialog });
    // }

    // private onTimeoutCancel(): void {
    //     const config = ConfigureController.generateConfigure();
    //     config.trigger("Message_Dialog_Close", { obj: "Dynamic Page Timeout Cancel" });
    //     config.trigger("Request_Waiting_Timeout_Cancel", { obj: "" });

    //     // window.location.reload();
    // }

    // private onTimeoutContinue(): void {
    //     const config = ConfigureController.generateConfigure();
    //     config.trigger("Message_Dialog_Close", { obj: "Dynamic Page Timeout Cancel" });

    //     this.timer = window.setTimeout(this.onWaitTimeout.bind(this), this.Overtime);
    // }
}
