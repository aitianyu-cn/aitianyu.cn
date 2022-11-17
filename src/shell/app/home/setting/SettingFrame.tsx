/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { ISettingProperty } from "./SettingFrame.model";

import "./css/main.css";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { UserLoginStateKey } from "tianyu-server/controller/Account.controller";

const messageBundle = require_msgbundle("home", "app");

export class SettingFrame extends React.Component<ISettingProperty, IReactState> {
    public constructor(props: ISettingProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_SETTING_TITLE");
    }

    public override render(): React.ReactNode {
        if (!!!CacheController.get(UserLoginStateKey)) {
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
