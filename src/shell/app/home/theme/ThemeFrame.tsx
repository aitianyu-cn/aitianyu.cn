/**@format */

import React from "react";
import { createSingleSelectorGroup } from "tianyu-shell/common/controller/Selection.controller";
import { ReactRadioButton } from "tianyu-shell/ui/react/widget/control/ReactRadioButton";
import { ReactToggle } from "tianyu-shell/ui/react/widget/control/ReactToggle";
import { require_msgbundle } from "ts-core/I18n";
import { IThemeProperty } from "./ThemeFrame.model";

const messageBundle = require_msgbundle("home", "app");

export class ThemeFrame extends React.Component<IThemeProperty, IReactState> {
    public constructor(props: IThemeProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_THEME_TITLE");
    }

    private onStateChanged(id: string, state: boolean): void {
        // console.log(`Toggle - ${id} is set to ${state ? "ON" : "OFF"}`);
    }

    private onRadioStateChanged(id: string, select: boolean): void {
        if (select) {
            console.log(`Radio - switch to ${id}`);
        } else {
            console.log(`Radio - ${id} is leave`);
        }
    }

    public override render(): React.ReactNode {
        const group = createSingleSelectorGroup("r1", this.onRadioStateChanged);

        return (
            <div>
                <div>theme</div>
                <div style={{ margin: 15 }}>
                    <ReactToggle
                        id="1"
                        size={30}
                        lineLenght={0}
                        defaultState={false}
                        type={"square"}
                        onStateChange={this.onStateChanged}
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <ReactToggle id="2" size={30} lineLenght={0} defaultState={false} onStateChange={this.onStateChanged} />
                </div>
                <div style={{ margin: 15 }}>
                    <ReactToggle
                        id="3"
                        size={30}
                        lineLenght={0}
                        defaultState={true}
                        type={"square"}
                        onStateChange={this.onStateChanged}
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <ReactToggle id="4" size={30} lineLenght={0} defaultState={true} onStateChange={this.onStateChanged} />
                </div>

                <div style={{ margin: 15 }}>
                    <ReactRadioButton id="r1" value="radio button 1" group={group} selected={true} size={40} />
                </div>
                <div style={{ margin: 15 }}>
                    <ReactRadioButton
                        id="r2"
                        value="radio button 2llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
                        group={group}
                        size={100}
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <ReactRadioButton id="r3" value="radio button 3" group={group} size={10} />
                </div>
                <div style={{ margin: 15 }}>
                    <ReactRadioButton id="r4" value="radio button 4" group={group} />
                </div>
            </div>
        );
    }
}
