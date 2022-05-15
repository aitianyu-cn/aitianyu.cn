/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/footer.main.css";
import { MessageBundle } from "../../dty/common/i18n/MessageBundle";
import { Configure } from "../../dty/common/core/Configure";
import { AreaCode } from "../../dty/common/AreaCode";

export class Footer extends React.Component<IShellProperty, IShellState> {
    private msgBundle: MessageBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgBundle = new MessageBundle(Footer.getI18nObject());
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        return (
            <div id="Footer">
                <div className="footerContent_spile_line"></div>
                <div id="footerContent_empty_line"></div>
                <div id="footerContent_ContactToUs">
                    {this.getI18nText("CONTACT_US")}&nbsp; &nbsp;
                    <a href="mailto:public@aitianyu.cn">{this.getI18nText("EMAIL_TEXT")}</a>&nbsp;&amp;&nbsp;
                    <a href="tel:+8615685154601">{this.getI18nText("PHONE_TEXT")}</a>&nbsp; &nbsp;
                    {this.getI18nText("LOOKING_FORWARD_CONTACT")}
                </div>
                <div id="footerContent_CR_ICP_DCP">{this.getI18nText("COPYRIGHT_TEXT")} © aitianyu.cn 2021-2024</div>
                <div id="footerContent_CR_ICP_DCP">
                    <div>
                        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
                            黔ICP备2021004555号-1
                        </a>
                    </div>
                </div>
                <div id="footerContent_EndBeforeColorBalance"></div>
            </div>
        );
    }

    private getI18nText(text: string): string {
        return this.msgBundle.getText(text) || text;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static getI18nObject(): any {
        const oConfig = Configure.generateConfigure();
        switch (oConfig.getArea()) {
            case AreaCode.en_US:
                return require("./res/i18n/international_en_US.json");
            case AreaCode.zh_CN:
            default:
                return require("./res/i18n/international_zh_CN.json");
        }
    }
}
