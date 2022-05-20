/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { setLanguage } from "src/dty/RouterHelper";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./main.css";

export class Language extends TYViewComponent {
    public constructor(props: IShellProperty) {
        super(props);

        document.title = this.msgBundle.getText("AITIANYU_DEV_LANGUAGE_TITLE") || "选择语言";
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const aSupportNodes: React.ReactNode[] = this.renderLanguageItems("support", true);
        const aPendingNodes: React.ReactNode[] = this.renderLanguageItems("pending", false);

        return (
            <div className="language_base_grid">
                <div className="language_start_empty_div_title"></div>
                <div className="language_base_container">
                    <div className="language_title_div">{this.msgBundle.getI18n("LANGUAGE_TITLE")}</div>
                    <div className="language_start_empty_div"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">{this.msgBundle.getI18n("LANGUAGE_SUPPORT_TITLE")}</div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aSupportNodes}</ul>
                    </div>
                    <div className="language_start_empty_div_title"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">{this.msgBundle.getI18n("LANGUAGE_PENDING_TITLE")}</div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aPendingNodes}</ul>
                    </div>
                </div>
            </div>
        );
    }

    private renderLanguageItems(type: string, isSupport: boolean): React.ReactNode[] {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const languageSupport = require("./res/languages.json");
        if (!languageSupport || !languageSupport[type]) {
            return [];
        }

        const languages = languageSupport[type];
        if (!Array.isArray(languages) || languages.length === 0) {
            return [];
        }

        const languageNodes: React.ReactNode[] = [];
        for (const item of languages) {
            languageNodes.push(this.createLanguageTip(item, isSupport));
        }

        return languageNodes;
    }

    private createLanguageTip(language: string, isSupport: boolean): React.ReactNode {
        const languageName = this.msgBundle.getI18n(language);
        const fnChangeLanguage = () => {
            setLanguage(language);
        };

        return (
            <li key={language} className="language_tip_container">
                {isSupport ? (
                    <div className="language_tip_div" onClick={fnChangeLanguage}>
                        {languageName}
                    </div>
                ) : (
                    <div
                        className="language_tip_div_unsupport"
                        placeholder={this.msgBundle.getI18n("LANGUAGE_PENDING_MOUSE_HOLDER")}>
                        {languageName}
                    </div>
                )}
            </li>
        );
    }
}
