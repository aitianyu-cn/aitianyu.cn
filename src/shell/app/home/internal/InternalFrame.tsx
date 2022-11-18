/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IInternalFrameProperty } from "./InternalFrame.model";
import { isUserLogon } from "tianyu-server/controller/Account.controller";
import { LogonPanel } from "../common/LogonPanel";
import { LoginPanel } from "../common/LoginPanel";
import { Router } from "ts-core/Router";
import { guid } from "ts-core/Guid";
import { FeatureToggle } from "ts-core/FeatureToggle";

import "./css/main.css";
import "./css/logon.css";
import { RetrievePassword } from "../common/RetrievePassword";

const interframeHashListener = "homepage_frame_hashchanged_listener";
const messageBundle = require_msgbundle("home", "app");

const loginPageId = "test_logon_page";
const forgetPWPageId = "test_forget_pw_page";
// const loginPageId = guid();
// const forgetPWPageId = guid();

export class InternalFrame extends React.Component<IInternalFrameProperty, IReactState> {
    private hashUrl: string;

    public constructor(props: IInternalFrameProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_INTERNAL_TITLE");

        this.hashUrl = Router.getHash();
        if (this.hashUrl.startsWith("/")) this.hashUrl = this.hashUrl.substring(1);
        if (this.hashUrl.endsWith("/")) this.hashUrl = this.hashUrl.substring(0, this.hashUrl.length - 1);
    }

    public override componentDidMount(): void {
        tianyuShell.core.event.onhashChanged.listen(interframeHashListener, this.onHashChanged.bind(this));
    }

    public override componentWillUnmount(): void {
        tianyuShell.core.event.onhashChanged.removeListen(interframeHashListener);
    }

    public override render(): React.ReactNode {
        return (
            <div className="pending_setting_outter">
                <div className="pending_setting_inner">{<RetrievePassword />}</div>
            </div>
        );
        // return (
        //     <div className="pending_setting_outter">
        //         <div className="pending_setting_inner">{this.renderToContent()}</div>
        //     </div>
        // );
    }

    private renderToContent(): React.ReactNode {
        if (!FeatureToggle.isActive("TIANYU_CN_BETA_INTERNAL_READY")) {
            return <h1>{messageBundle.getText("HOME_PAGE_SETTING_FRAME_PENDING")}</h1>;
        }

        if (this.hashUrl === `tianyu/${loginPageId}`) return <LoginPanel />;
        if (this.hashUrl === `tianyu/${forgetPWPageId}`) return <RetrievePassword />;
        if (isUserLogon()) return this.renderNormal();

        return (
            <LogonPanel
                fnLogonSuccess={this.onLogonSuccess.bind(this)}
                fnForgetPassword={this.onForgetPassword.bind(this)}
                fnLoginRequire={this.onLoginRequire.bind(this)}
            />
        );
    }

    private renderNormal(): React.ReactNode {
        return <div></div>;
    }

    private onHashChanged(): void {
        let hashUrl = Router.getHash();
        if (hashUrl.startsWith("/")) hashUrl = hashUrl.substring(1);
        if (hashUrl.endsWith("/")) hashUrl = hashUrl.substring(0, this.hashUrl.length - 1);

        if (hashUrl === this.hashUrl) {
            return;
        }

        this.hashUrl = hashUrl;
        this.forceUpdate();
    }

    private onLogonSuccess(): void {
        this.forceUpdate();
    }

    private onLoginRequire(): void {
        Router.jump(`tianyu/${loginPageId}`, false);
    }

    private onForgetPassword(): void {
        Router.jump(`tianyu/${forgetPWPageId}`, false);
    }
}