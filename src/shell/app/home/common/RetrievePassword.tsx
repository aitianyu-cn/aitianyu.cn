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
const isMob = isMobile();

const inputStyle = {
    width: "100%",
    fontSize: isMob ? "18px" : "15px",
    borderRadius: isMob ? "10px" : "10px",
    borderStyle: isMob ? "solid" : "none",
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
const doubleVerifyTokenId = "HOME_PAGE_INTERNAL_RETRIEVE_DOUBLE_VERIFY";
const doubleVerifyState = "HOME_PAGE_INTERNAL_RETRIEVE_DOUBLE_VERIFY_STATE";
const doubleVerifyChangePWState = "HOME_PAGE_INTERNAL_RETRIEVE_PW_STATE";
// const doubleVerifyId = guid();

export interface IRetrievePasswordProperty {}

export class RetrievePassword extends React.Component<IRetrievePasswordProperty, IReactState> {
    private emailInput: React.RefObject<HTMLInputElement>;

    private verifyInput: React.RefObject<HTMLInputElement>;

    private pwInput: React.RefObject<HTMLInputElement>;
    private inChangingPW: boolean;
    private changePWToken: string;

    public constructor(props: IRetrievePasswordProperty) {
        super(props);

        this.pwInput = React.createRef();
        this.emailInput = React.createRef();
        this.verifyInput = React.createRef();

        this.inChangingPW = false;
        this.changePWToken = "";
    }

    public override render(): React.ReactNode {
        if (this.inChangingPW) {
            return this.renderChangePW();
        }

        if (this.checkVerifyState()) {
            return this.renderVerify();
        }

        // return this.renderVerify();
        return this.renderRetrieve();
    }

    private renderRetrieve(): React.ReactNode {
        return (
            <div className="h_i_logon_container">
                <div style={{ padding: "20px" }}>
                    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "15px" }}>
                            <h1 style={{ textAlign: "center" }}>{messageBundle.getText("HOME_PAGE_INTERNAL_RETRIEVE_TITLE")}</h1>
                        </div>
                        <div style={{ fontSize: isMob ? "18px" : "15px", width: "fit-content" }}>
                            {this.renderInputItem("HOME_PAGE_INTERNAL_RETRIEVE_EMAIL_ITEM", this.emailInput, "email")}
                            <button
                                className={isMob ? "h_i_logon_on_button_mob" : "h_i_logon_on_button"}
                                type={"button"}
                                onClick={this.onRetrieve.bind(this)}>
                                <div style={{ margin: "auto" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_RETRIEVE_NEXT_BUTTON")}
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
                        <div style={{ fontSize: isMob ? "18px" : "15px", width: "fit-content" }}>
                            <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                                {messageBundle.getText("HOME_PAGE_INTERNAL_LOG_VERIFY_HINTS")}
                            </div>

                            <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                                {CacheController.get("HOME_PAGE_INTERNAL_LOGIN_EMAIL_ITEM")}
                            </div>
                            {this.renderInputItem("HOME_PAGE_INTERNAL_LOG_VERIFY_ITEM", this.verifyInput)}
                            <button
                                className={isMob ? "h_i_logon_on_button_mob" : "h_i_logon_on_button"}
                                type={"button"}
                                onClick={this.onVerify.bind(this)}>
                                <div style={{ margin: "auto" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_RETRIEVE_NEXT_BUTTON")}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderChangePW(): React.ReactNode {
        return (
            <div className="h_i_logon_container">
                <div style={{ padding: "20px" }}>
                    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "15px" }}>
                            <h1 style={{ textAlign: "center" }}>{messageBundle.getText("HOME_PAGE_INTERNAL_CHANGE_PW_TITLE")}</h1>
                        </div>
                        <div style={{ fontSize: isMob ? "18px" : "15px", width: "fit-content" }}>
                            <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                                {CacheController.get("HOME_PAGE_INTERNAL_LOGIN_EMAIL_ITEM")}
                            </div>
                            {this.renderInputItem("HOME_PAGE_INTERNAL_CHANGE_PW_ITEM", this.pwInput, "password")}
                            <button
                                className={isMob ? "h_i_logon_on_button_mob" : "h_i_logon_on_button"}
                                type={"button"}
                                onClick={this.onChangePW.bind(this)}>
                                <div style={{ margin: "auto" }}>
                                    {messageBundle.getText("HOME_PAGE_INTERNAL_CHANGE_PW_BUTTON")}
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
            <div className={isMob ? "" : "h_i_logon_input_container"}>
                <div style={{ marginRight: "10px" }}>{messageBundle.getText(title)}</div>
                <div style={inputContainer}>
                    <input title={title} ref={ref} type={type} style={inputStyle} defaultValue={CacheController.get(title)} />
                </div>
            </div>
        );
    }

    private onRetrieve(): void {
        if (!!!this.emailInput.current) {
            // to throw system error
            alert("system error");
            return;
        }

        const email = this.emailInput.current.value;
        if (checkUserType(email) !== "email") {
            alert("email not valid");
            return;
        }

        // cache the current info
        CacheController.cache("HOME_PAGE_INTERNAL_RETRIEVE_EMAIL_ITEM", email);

        WaitingDialog.withDialog(async () => {
            return this.retrieve(email);
        }, messageBundle.getText("HOME_PAGE_INTERNAL_LOGON_LOGONING"));
    }
    private async retrieve(email: string): Promise<void> {
        return new Promise<void>((resolve) => {
            //
        });
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
        // cache the current info
        CacheController.remove("HOME_PAGE_INTERNAL_RETRIEVE_EMAIL_ITEM");

        this.inChangingPW = true;
        this.forceUpdate();
    }
    private verifyFailed(): void {
        alert("failed");
    }

    private onChangePW(): void {
        if (!!!this.pwInput.current) {
            alert("system error");
            return;
        }

        const pw = this.pwInput.current.value;
        if (!!!pw) {
            alert("pw is empty");
            return;
        }

        WaitingDialog.withDialog(async () => {
            this.changePW(pw);
        }, messageBundle.getText("HOME_PAGE_INTERNAL_RETRIEVE_PW_ING"));
    }
    private async changePW(pw: string): Promise<void> {
        return new Promise<void>((resolve) => {});
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
