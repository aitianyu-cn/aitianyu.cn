/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { ISettingProperty } from "./SettingFrame.model";
import { isUserLogon } from "tianyu-server/controller/Account.controller";

import "./css/main.css";

const messageBundle = require_msgbundle("home", "app");

export class SettingFrame extends React.Component<ISettingProperty, IReactState> {
    public constructor(props: ISettingProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_SETTING_TITLE");
    }

    public override render(): React.ReactNode {
        if (!isUserLogon()) {
            return this.renderNoUser();
        }

        return (
            <div className="pending_setting_outter">
                <div className="pending_setting_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_SETTING_FRAME_PENDING")}</h1>
                </div>
            </div>
        );
    }

    private renderNoUser(): React.ReactNode {
        return (
            <div className="pending_setting_outter">
                <div className="pending_setting_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_FEATURE_UNSUPPORT_NO_USER")}</h1>
                </div>
            </div>
        );
    }
}
