/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { ISettingProperty } from "./SettingFrame.model";

import "./css/main.css";

const messageBundle = require_msgbundle("home", "app");

export class SettingFrame extends React.Component<ISettingProperty, IReactState> {
    public constructor(props: ISettingProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_SETTING_TITLE");
    }

    public override render(): React.ReactNode {
        return (
            <div className="pending_setting_outter">
                <div className="pending_setting_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_SETTING_FRAME_PENDING")}</h1>
                </div>
            </div>
        );
    }
}
