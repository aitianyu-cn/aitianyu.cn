/**@format */

import React from "react";
import { login, logon, verify } from "tianyu-server/controller/Account.controller";
import { loadCustomizedFeatureToggles } from "tianyu-server/controller/FeatureToggle.controller";
import { IAccountVerify, ILoginPost, ILoginPostResult, LoginResult } from "tianyu-server/model/Login.model";
import { ILogonPost, LogonResultType } from "tianyu-server/model/Logon.model";
import { checkUserType } from "tianyu-server/utilities/Utils";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";
import { CallbackAction } from "ts-core/Types";

const messageBundle = require_msgbundle("home", "app");

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
    borderBottomColor: "var(--ts_ui_blk_4)",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
};

const doubleVerifyId = "test_logon_double_verify";
const doubleVerifyTokenId = "HOME_PAGE_INTERNAL_LOGIN_DOUBLE_VERIFY";
const doubleVerifyState = "HOME_PAGE_INTERNAL_LOGIN_DOUBLE_VERIFY_STATE";
// const doubleVerifyId = guid();

export interface ILoginPanelProperty {}

export class LoginPanel extends React.Component<ILoginPanelProperty, IReactState> {
    private userInput: React.RefObject<HTMLInputElement>;
    private pwInput: React.RefObject<HTMLInputElement>;
    private emailInput: React.RefObject<HTMLInputElement>;
    private userNameInput: React.RefObject<HTMLInputElement>;
    private activeInput: React.RefObject<HTMLInputElement>;

    private verifyInput: React.RefObject<HTMLInputElement>;

    public constructor(props: ILoginPanelProperty) {
        super(props);

        this.userInput = React.createRef();
        this.pwInput = React.createRef();
        this.emailInput = React.createRef();
        this.userNameInput = React.createRef();
        this.activeInput = React.createRef();
        this.verifyInput = React.createRef();
    }

    public override render(): React.ReactNode {
        if (this.checkVerifyState()) {
            return this.renderVerify();
        }

        // return this.renderVerify();
        return this.renderLogin();
    }

    private renderLogin(): React.ReactNode {
        return (
            <div className="h_i_logon_container">
                <div style={{ padding: "20px" }}>
                    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "15px" }}>
                            <h1 style={{ textAlign: "center" }}>{messageBundle.getText("HOME_PAGE_INTERNAL_LOGIN_TITLE")}</h1>
                        </div>
                        <div style={{ fontSize: isMobile ? "18px" : "15px", width: "fit-content" }}>
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOGIN_USER_ITEM", this.userInput)}
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOGIN_PW_ITEM", this.pwInput, "password")}
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOGIN_USERNAME_ITEM", this.userNameInput)}
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOGIN_EMAIL_ITEM", this.emailInput, "email")}
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOGIN_ACTIVE_ITEM", this.activeInput)}
                            <button
                                className={isMobile ? "h_i_logon_on_button_mob" : "h_i_logon_on_button"}
                                type={"button"}
                                onClick={this.onLogin.bind(this)}>
                                <div style={{ margin: "auto" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOGIN_LOGIN_BUTTON")}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderVerify(): React.ReactNode {
        return (
            <div className="h_i_logon_container">
                <div style={{ padding: "20px" }}>
                    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "15px" }}>
                            <h1 style={{ textAlign: "center" }}>{messageBundle.getText("HOME_PAGE_INTERNAL_VERIFY_TITLE")}</h1>
                        </div>
                        <div style={{ fontSize: isMobile ? "18px" : "15px", width: "fit-content" }}>
                            <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                                {messageBundle.getText("HOME_PAGE_INTERNAL_LOG_VERIFY_HINTS")}
                            </div>
                            <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                                {CacheController.get("HOME_PAGE_INTERNAL_LOGIN_EMAIL_ITEM")}
                            </div>
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOG_VERIFY_ITEM", this.verifyInput)}
                            <button
                                className={isMobile ? "h_i_logon_on_button_mob" : "h_i_logon_on_button"}
                                type={"button"}
                                onClick={this.onVerify.bind(this)}>
                                <div style={{ margin: "auto" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_LOG_VERIFY_BUTTON")}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderInputItem(
        title: string,
        ref: React.RefObject<HTMLInputElement>,
        type?: React.HTMLInputTypeAttribute,
    ): React.ReactNode {
        return (
            <div className={isMobile ? "" : "h_i_logon_input_container"}>
                <div style={{ marginRight: "10px" }}>{messageBundle.getText(title)}</div>
                <div style={inputContainer}>
                    <input title={title} ref={ref} type={type} style={inputStyle} defaultValue={CacheController.get(title)} />
                </div>
            </div>
        );
    }

    private onLogin(): void {
        if (!this.userInput.current || !this.pwInput.current || !this.emailInput.current || !this.activeInput.current) {
            // to throw system error
            alert("system error");
            return;
        }

        const user = this.userInput.current.value;
        const pw = this.pwInput.current.value;
        const userName = this.userNameInput.current?.value || "";
        const email = this.emailInput.current.value;
        const active = this.activeInput.current.value;
        if (!!!user || !!!pw || !!!email || !!!active) {
            // to throw user or pw is not available
            alert("user or pw is empty");
            return;
        }

        if (checkUserType(email) !== "email") {
            alert("email not valid");
            return;
        }

        // cache the current info
        CacheController.cache("HOME_PAGE_INTERNAL_LOGIN_USER_ITEM", user);
        CacheController.cache("HOME_PAGE_INTERNAL_LOGIN_PW_ITEM", pw);
        CacheController.cache("HOME_PAGE_INTERNAL_LOGIN_USERNAME_ITEM", userName);
        CacheController.cache("HOME_PAGE_INTERNAL_LOGIN_EMAIL_ITEM", email);
        CacheController.cache("HOME_PAGE_INTERNAL_LOGIN_ACTIVE_ITEM", active);

        WaitingDialog.withDialog(async () => {
            return this.login({
                user: user,
                mail: email,
                name: userName,
                pw: pw,
                active: active,
            });
        }, messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_LOGONING"));
    }
    private async login(post: ILoginPost): Promise<void> {
        return new Promise<void>((resolve) => {
            login(post).then((result: ILoginPostResult) => {
                // to ensure the pre-waiting-dialog is closed
                if (result.state === "success") {
                    // verify success
                    // to cache the token and should move to the second page
                    CacheController.cache(doubleVerifyTokenId, result.token);
                    CacheController.cache(doubleVerifyState, Date.now());

                    this.loginSuccess();
                } else {
                    resolve();

                    setTimeout(() => {
                        this.loginFailed(result.state);
                    }, 10);
                }
            });
        });
    }
    private loginSuccess(): void {
        this.forceUpdate();
    }
    private loginFailed(result: LoginResult): void {
        alert(result);
    }

    private onVerify(): void {
        if (!!!this.verifyInput.current) {
            alert("system error");
            return;
        }

        const code = this.verifyInput.current.value;
        if (!!!code) {
            alert("no verify code");
            return;
        }

        if (code.length !== 8) {
            alert("verify code not valid");
            return;
        }

        WaitingDialog.withDialog(async () => {
            return this.verify(code);
        }, messageBundle.getText("HOME_PAGE_INTERNAL_LOG_VERIFYING"));
    }
    private async verify(code: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const post: IAccountVerify = {
                token: CacheController.get(doubleVerifyTokenId),
                vcode: code,
            };
            verify(post).then((result: boolean) => {
                resolve();
                if (result) this.verifySuccess();
                else this.verifyFailed();
            });
        });
    }
    private verifySuccess(): void {
        alert("success");

        // cache the current info
        CacheController.remove("HOME_PAGE_INTERNAL_LOGIN_USER_ITEM");
        CacheController.remove("HOME_PAGE_INTERNAL_LOGIN_PW_ITEM");
        CacheController.remove("HOME_PAGE_INTERNAL_LOGIN_USERNAME_ITEM");
        CacheController.remove("HOME_PAGE_INTERNAL_LOGIN_EMAIL_ITEM");
        CacheController.remove("HOME_PAGE_INTERNAL_LOGIN_ACTIVE_ITEM");
    }
    private verifyFailed(): void {
        alert("failed");
    }

    private checkVerifyState(): boolean {
        const verifyState = CacheController.get(doubleVerifyState);
        if (typeof verifyState !== "number") {
            return false;
        }

        const during = Date.now() - verifyState;
        if (during < 0) {
            return false;
        }

        const duringTime = new Date(during);
        return duringTime.getMinutes() < 30;
    }
}
