/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { ISettingProperty } from "./SettingFrame.model";

const messageBundle = require_msgbundle("home", "app");

export class SettingFrame extends React.Component<ISettingProperty, IReactState> {
    public constructor(props: ISettingProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_THEME_TITLE");
    }

    public override render(): React.ReactNode {
        return <div>setting</div>;
    }
}
