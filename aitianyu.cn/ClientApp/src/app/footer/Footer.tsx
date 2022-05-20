/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/footer.main.css";

export class Footer extends TYViewComponent {
    public constructor(props: IShellProperty) {
        super(props);
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
                    {this.msgBundle.getI18n("CONTACT_US")}&nbsp; &nbsp;
                    <a href="mailto:dev.aitianyu.cn@outlook.com">{this.msgBundle.getI18n("EMAIL_TEXT")}</a>&nbsp;
                    {/* &amp;&nbsp; */}
                    {/* <a href="tel:+8615685154601">{this.getI18nText("PHONE_TEXT")}</a>&nbsp; &nbsp; */}
                    {this.msgBundle.getI18n("LOOKING_FORWARD_CONTACT")}
                </div>
                <div id="footerContent_CR_ICP_DCP">{this.msgBundle.getI18n("COPYRIGHT_TEXT")} © aitianyu.cn 2021-2024</div>
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
}
