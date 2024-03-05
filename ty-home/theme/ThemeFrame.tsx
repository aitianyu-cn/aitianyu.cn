/**@format */

import React from "react";
import { IThemeProperty } from "./ThemeFrame.model";
import { IReactState } from "ty-infra/ui/model/React";
import { ISingleSelectorController } from "ty-infra/ui/model/Selector";
import { createSingleSelectorGroup } from "ty-infra/ui/controller/SingleSelection";
import { Theme } from "@aitianyu.cn/tianyu-shell/core";
import { ReactRadioButton } from "ty-infra/ui/react/control/ReactRadioButton";
import { ReactToggle } from "ty-infra/ui/react/control/ReactToggle";
import * as MessageBundle from "ty-infra/ui/i18n/MessageBundle";

import "../css/theme.css";

const _themeList: string[] = ["tianyu_default", "tianyu_red", "tianyu_green", "tianyu_purple", "tianyu_mono"];

export class ThemeFrame extends React.Component<IThemeProperty, IReactState> {
    private themeGroup: ISingleSelectorController;
    private colorState: boolean;

    public constructor(props: IThemeProperty) {
        super(props);

        this.colorState = false;
        this.themeGroup = createSingleSelectorGroup("", this.onRadioStateChanged.bind(this));
        document.title = MessageBundle.getText("HOME_PAGE_THEME_TITLE");
    }

    public override render(): React.ReactNode {
        const defaultTheme = Theme.getDefault();
        if (!defaultTheme) {
            return this.renderThemeUnsupport();
        }

        const defaultThemeTrans = this.translateThemeName(defaultTheme.theme);

        const customTheme = Theme.getCustome() || defaultTheme;
        this.themeGroup.setSelected(customTheme.theme);

        this.colorState = customTheme.color === "dark";

        return (
            <div className="h_t_b">
                <div className="h_t_t">
                    <div>{MessageBundle.getText("HOME_PAGE_THEME_FRAME_PAGE_TITLE")}</div>
                </div>
                <div className="h_t_i_c">
                    <div className="h_t_i_t">
                        <div>{MessageBundle.getText("HOME_PAGE_THEME_FRAME_DEFAULT_TITLE")}</div>
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
                            <div className="h_t_i_i_i_n">{MessageBundle.getText("HOME_PAGE_THEME_FRAME_COLOR")}</div>
                            <div className="h_t_i_i_i_v">
                                {MessageBundle.getText(`HOME_PAGE_THEME_FRAME_COLOR_${defaultTheme.color.toUpperCase()}`)}
                            </div>
                        </div>
                        <div className="h_t_i_i_i h_t_i_i_i_ulc">
                            <div className="h_t_i_i_i_n">{MessageBundle.getText("HOME_PAGE_THEME_FRAME_THEME")}</div>
                            <div className="h_t_i_i_i_v">{defaultThemeTrans}</div>
                        </div>
                    </div>
                </div>
                <div className="h_t_i_c">
                    <div className="h_t_i_t">
                        <div>{MessageBundle.getText("HOME_PAGE_THEME_FRAME_CUSTOM_TITLE")}</div>
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
                            <div className="h_t_i_i_i_n">{MessageBundle.getText("HOME_PAGE_THEME_FRAME_COLOR")}</div>
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
                                <div>
                                    {MessageBundle.getText(`HOME_PAGE_THEME_FRAME_COLOR_${customTheme.color.toUpperCase()}`)}
                                </div>
                            </div>
                        </div>
                        <div className="h_t_i_i_i h_t_i_i_i_ulc">
                            <div className="h_t_i_i_i_n">{MessageBundle.getText("HOME_PAGE_THEME_FRAME_THEME")}</div>
                            <div className="h_t_i_i_i_v">{this.renderThemeList()}</div>
                        </div>
                    </div>
                </div>
                <div style={{ height: "30px" }} />
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
                <div key={`theme_id_${theme}`} style={{ marginBottom: 10 }}>
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
        const defaultThemeI18nTrans = MessageBundle.getText(defaultThemeI18n);
        return MessageBundle.getText(defaultThemeI18n) === defaultThemeI18n ? theme.replaceAll("_", " ") : defaultThemeI18nTrans;
    }

    private onStateChanged(name: string, state: boolean): void {
        this.colorState = state;
        Theme.change(
            {
                theme: this.themeGroup.selectedItem(),
                color: state ? "dark" : "light",
            },
            true,
        );
        this.forceUpdate();
    }

    private onRadioStateChanged(id: string, select: boolean): void {
        if (select) {
            Theme.change(
                {
                    theme: this.themeGroup.selectedItem(),
                    color: this.colorState ? "dark" : "light",
                },
                true,
            );
        }
    }
}
