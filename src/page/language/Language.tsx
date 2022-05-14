/**@format */

import React from "react";
import { AreaCode } from "../../dty/common/AreaCode";
import { Configure } from "../../dty/common/core/Configure";
import { MessageBundle } from "../../dty/common/i18n/MessageBundle";
import { setLanguage } from "../../dty/common/RouteHelp";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/main.css";

export class Language extends React.Component<IShellProperty, IShellState> {
    private msgBundle: MessageBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgBundle = new MessageBundle(Language.getI18nObject());
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
                    <div className="language_title_div">{this.getI18nText("LANGUAGE_TITLE")}</div>
                    <div className="language_start_empty_div"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">{this.getI18nText("LANGUAGE_SUPPORT_TITLE")}</div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aSupportNodes}</ul>
                    </div>
                    <div className="language_start_empty_div_title"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">{this.getI18nText("LANGUAGE_PENDING_TITLE")}</div>
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
        const languageName = this.getI18nText(language);
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
                    <div className="language_tip_div_unsupport">{languageName}</div>
                )}
            </li>
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
