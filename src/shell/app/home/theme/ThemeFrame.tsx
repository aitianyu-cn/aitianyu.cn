/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IThemeProperty } from "./ThemeFrame.model";

const messageBundle = require_msgbundle("home", "app");

export class ThemeFrame extends React.Component<IThemeProperty, IReactState> {
    public constructor(props: IThemeProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_THEME_TITLE");
    }

    public override render(): React.ReactNode {
        return <div>theme</div>;
    }
}
