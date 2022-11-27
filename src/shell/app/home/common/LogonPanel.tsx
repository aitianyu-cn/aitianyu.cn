/**@format */

import React from "react";
import { logon } from "tianyu-server/controller/Account.controller";
import { loadCustomizedFeatureToggles } from "tianyu-server/controller/FeatureToggle.controller";
import { ILogonPost, LogonResultType } from "tianyu-server/model/Logon.model";
import { checkUserType } from "tianyu-server/utilities/Utils";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";
import { CallbackAction } from "ts-core/Types";

const messageBundle = require_msgbundle("home", "app");

const logonPanelUserCacheID = "internal-frame-logon-user";
const logonPanelUserPWCacheID = "internal-frame-logon-user-pw";

export interface ILogonPanelProperty {
    fnLogonSuccess: CallbackAction;
    fnLoginRequire: CallbackAction;
    fnForgetPassword: CallbackAction;
}

export class LogonPanel extends React.Component<ILogonPanelProperty, IReactState> {
    private userInput: React.RefObject<HTMLInputElement>;
    private pwInput: React.RefObject<HTMLInputElement>;

    public constructor(props: ILogonPanelProperty) {
        super(props);

        this.userInput = React.createRef();
        this.pwInput = React.createRef();
    }

    public override render(): React.ReactNode {
        const inputStyle = {
            width: "100%",
            fontSize: isMobile ? "18px" : "15px",
            borderRadius: isMobile ? "10px" : "10px",
            borderStyle: isMobile ? "solid" : "none",
            backgroundColor: "transparent",
            background: "node",
            outline: "none",
            color: "var(--ts_ui_blk_1)",
        };
        const inputContainer: any = {
            marginRight: "0",
            marginLeft: "auto",
        };
        if (!isMobile) {
            inputContainer["borderBottomColor"] = "var(--ts_ui_blk_4)";
            inputContainer["borderBottomWidth"] = "1px";
            inputContainer["borderBottomStyle"] = "solid";
        }

        return (
            <div className="h_i_logon_container">
                <div style={{ padding: "20px" }}>
                    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "15px" }}>
                            <h1 style={{ textAlign: "center" }}>{messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_TITLE")}</h1>
                        </div>
                        <div style={{ fontSize: isMobile ? "18px" : "15px", width: "fit-content" }}>
                            <div className={isMobile ? "" : "h_i_logon_input_container"}>
                                <div style={{ marginRight: "10px" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_USER_ITEM")}
                                </div>
                                <div style={inputContainer}>
                                    <input
                                        title="HOME_PAGE_INTERNAL_LOGON_USER_ITEM"
                                        ref={this.userInput}
                                        style={inputStyle}
                                        defaultValue={CacheController.get(logonPanelUserCacheID)}
                                    />
                                </div>
                            </div>
                            <div className={isMobile ? "" : "h_i_logon_input_container"}>
                                <div style={{ marginRight: "10px" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_PW_ITEM")}
                                </div>
                                <div style={inputContainer}>
                                    <input
                                        title="HOME_PAGE_INTERNAL_LOGON_PW_ITEM"
                                        ref={this.pwInput}
                                        type={"password"}
                                        style={inputStyle}
                                        defaultValue={CacheController.get(logonPanelUserPWCacheID)}
                                    />
                                </div>
                            </div>
                            <div className="h_i_logon_addition_button">
                                <div
                                    className={isMobile ? "h_i_logon_addition_button_i_mob" : "h_i_logon_addition_button_i"}
                                    onClick={this.props.fnLoginRequire}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_LOGIN")}
                                </div>
                                <div
                                    className={isMobile ? "h_i_logon_addition_button_i_mob" : "h_i_logon_addition_button_i"}
                                    onClick={this.props.fnForgetPassword}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_FORGET_PW")}
                                </div>
                            </div>
                            <button
                                className={isMobile ? "h_i_logon_on_button_mob" : "h_i_logon_on_button"}
                                type={"button"}
                                onClick={this.onLogon.bind(this)}>
                                <div style={{ margin: "auto" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_LOGON_BUTTON")}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onLogon(): void {
        if (!this.userInput.current || !this.pwInput.current) {
            // to throw system error
            alert("system error");
            return;
        }

        const user = this.userInput.current.value;
        const pw = this.pwInput.current.value;
        if (!!!user || !!!pw) {
            // to throw user or pw is not available
            alert("user or pw is empty");
            return;
        }

        // cache the current info
        CacheController.cache(logonPanelUserCacheID, user);
        CacheController.cache(logonPanelUserPWCacheID, pw);

        WaitingDialog.withDialog(async () => {
            return this.logon(user, pw);
        }, messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_LOGONING"));
    }
    private async logon(user: string, pw: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const postData: ILogonPost = {
                user: user,
                userType: checkUserType(user),
                password: pw,
            };

            logon(postData).then((result: LogonResultType) => {
                // to ensure the pre-waiting-dialog is closed
                if (result === "success") {
                    // if user is logon successfully
                    // to load the customized feature toggles
                    loadCustomizedFeatureToggles().finally(() => {
                        resolve();

                        setTimeout(() => {
                            this.logonSuccess();
                        }, 10);
                    });
                } else {
                    resolve();

                    setTimeout(() => {
                        this.logonFailed(result);
                    }, 10);
                }
            });
        });
    }

    private logonSuccess(): void {
        CacheController.remove(logonPanelUserCacheID);
        CacheController.remove(logonPanelUserPWCacheID);

        this.props.fnLogonSuccess();
    }

    private logonFailed(result: LogonResultType): void {
        alert(result);
    }
}
