/**@format */

import React from "react";
import { createSingleSelectorGroup } from "tianyu-shell/common/controller/Selection.controller";
import { ISingleSelectorController } from "tianyu-shell/common/model/Selection.model";
import { ReactRadioButton } from "tianyu-shell/ui/react/widget/control/ReactRadioButton";
import { ReactToggle } from "tianyu-shell/ui/react/widget/control/ReactToggle";
import { require_msgbundle } from "ts-core/I18n";
import { IThemeProperty } from "./ThemeFrame.model";

import "./css/main.css";

// const _themeList: string[] = ["tianyu_mono", "tianyu_default", "tianyu_1", "tianyu_2", "tianyu_3", "tianyu_4"];
const _themeList: string[] = require("ts-static/theme/theme.config.json");
const messageBundle = require_msgbundle("home", "app");

export class ThemeFrame extends React.Component<IThemeProperty, IReactState> {
    private themeGroup: ISingleSelectorController;
    private colorState: boolean;

    public constructor(props: IThemeProperty) {
        super(props);

        this.colorState = false;
        this.themeGroup = createSingleSelectorGroup("", this.onRadioStateChanged.bind(this));
        document.title = messageBundle.getText("HOME_PAGE_THEME_TITLE");
    }

    public override render(): React.ReactNode {
        if (!!!tianyuShell.core.ui || !tianyuShell.core.ui.theme.default.valid) {
            return this.renderThemeUnsupport();
        }

        const defaultTheme = tianyuShell.core.ui.theme.default.theme;
        const defaultColor = tianyuShell.core.ui.theme.default.color;
        const defaultThemeTrans = this.translateThemeName(defaultTheme);

        const customTheme = tianyuShell.core.ui.theme.custom.valid ? tianyuShell.core.ui.theme.custom.theme : defaultTheme;
        const customColor = tianyuShell.core.ui.theme.custom.valid ? tianyuShell.core.ui.theme.custom.color : defaultColor;
        this.themeGroup.setSelected(customTheme);

        this.colorState = customColor === "dark";

        return (
            <div className="h_t_b">
                <div className="h_t_t">
                    <div>{messageBundle.getText("HOME_PAGE_THEME_FRAME_PAGE_TITLE")}</div>
                </div>
                <div className="h_t_i_c">
                    <div className="h_t_i_t">
                        <div>{messageBundle.getText("HOME_PAGE_THEME_FRAME_DEFAULT_TITLE")}</div>
                    </div>
                    <div
                        style={{
                            height: 1,
                            width: "100%",
                            marginTop: 20,
                            opacity: "20%",
                            backgroundColor: "var(--ts_ui_blk_5)",
                        }}></div>
                    <div className="h_t_i_i_c">
                        <div className="h_t_i_i_i h_t_i_i_i_ulc">
                            <div className="h_t_i_i_i_n">{messageBundle.getText("HOME_PAGE_THEME_FRAME_COLOR")}</div>
                            <div className="h_t_i_i_i_v">
                                {messageBundle.getText(`HOME_PAGE_THEME_FRAME_COLOR_${defaultColor.toUpperCase()}`)}
                            </div>
                        </div>
                        <div className="h_t_i_i_i h_t_i_i_i_ulc">
                            <div className="h_t_i_i_i_n">{messageBundle.getText("HOME_PAGE_THEME_FRAME_THEME")}</div>
                            <div className="h_t_i_i_i_v">{defaultThemeTrans}</div>
                        </div>
                    </div>
                </div>
                <div className="h_t_i_c">
                    <div className="h_t_i_t">
                        <div>{messageBundle.getText("HOME_PAGE_THEME_FRAME_CUSTOM_TITLE")}</div>
                    </div>
                    <div
                        style={{
                            height: 1,
                            width: "100%",
                            marginTop: 20,
                            opacity: "20%",
                            backgroundColor: "var(--ts_ui_blk_5)",
                        }}></div>
                    <div className="h_t_i_i_c">
                        <div className="h_t_i_i_i h_t_i_i_i_ulc">
                            <div className="h_t_i_i_i_n">{messageBundle.getText("HOME_PAGE_THEME_FRAME_COLOR")}</div>
                            <div className="h_t_i_i_i_v" style={{ display: "flex" }}>
                                <div style={{ marginRight: 30 }}>
                                    <ReactToggle
                                        id="custom_color_toggle"
                                        size={30}
                                        lineLenght={0}
                                        defaultState={this.colorState}
                                        onStateChange={this.onStateChanged.bind(this)}
                                    />
                                </div>
                                <div>{messageBundle.getText(`HOME_PAGE_THEME_FRAME_COLOR_${customColor.toUpperCase()}`)}</div>
                            </div>
                        </div>
                        <div className="h_t_i_i_i h_t_i_i_i_ulc">
                            <div className="h_t_i_i_i_n">{messageBundle.getText("HOME_PAGE_THEME_FRAME_THEME")}</div>
                            <div className="h_t_i_i_i_v">{this.renderThemeList()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderThemeUnsupport(): React.ReactNode {
        return <div></div>;
    }

    private renderThemeList(): React.ReactNode[] {
        const nodes: React.ReactNode[] = [];

        for (const theme of _themeList) {
            nodes.push(
                <div key={`theme_id_${theme}`}>
                    <ReactRadioButton
                        id={`${theme}`}
                        value={this.translateThemeName(theme)}
                        selected={this.themeGroup.selectedItem() === theme}
                        group={this.themeGroup}
                        insideMargin={20}
                    />
                </div>,
            );
        }

        return nodes;
    }

    private translateThemeName(theme: string): string {
        const defaultThemeI18n = `HOME_PAGE_THEME_FRAME_THEME_${theme.toUpperCase()}`;
        const defaultThemeI18nTrans = messageBundle.getText(defaultThemeI18n);
        return messageBundle.getText(defaultThemeI18n) === defaultThemeI18n ? theme.replaceAll("_", " ") : defaultThemeI18nTrans;
    }

    private onStateChanged(name: string, state: boolean): void {
        this.colorState = state;
        tianyuShell.core.ui?.theme.change(this.themeGroup.selectedItem(), state ? "dark" : "light", true);
        this.forceUpdate();
    }

    private onRadioStateChanged(id: string, select: boolean): void {
        if (select) {
            tianyuShell.core.ui?.theme.change(this.themeGroup.selectedItem(), this.colorState ? "dark" : "light", true);
        }
    }
}
