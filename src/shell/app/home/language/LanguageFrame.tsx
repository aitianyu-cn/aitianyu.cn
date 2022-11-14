/**@format */

import React from "react";
import { go, pageRefresh } from "tianyu-shell/common/utilities/PageHelper";
import { parseAreaString } from "ts-core/AreaHelper";
import { require_msgbundle } from "ts-core/I18n";
import { Language } from "ts-core/Language";

import "./main.css";

export interface ILanguageProperty extends IReactProperty {}

const languageSupportSource: any = {
    support: tianyuShell.core.language?.supportLanguage,
    pending: tianyuShell.core.language?.pendingLanguage,
};
const messageBundle = require_msgbundle("home", "app");
const languageMessageBundle = require_msgbundle("language-list");

export class LanguageFrame extends React.Component<ILanguageProperty, IReactState> {
    public constructor(props: ILanguageProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_LANGUAGE_TITLE");
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
                    <div className="language_title_div">
                        {messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_INTERNAL_TITLE")}
                    </div>
                    <div className="language_start_empty_div"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">
                            {messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_SUPPORT_TITLE")}
                        </div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aSupportNodes}</ul>
                    </div>
                    <div className="language_start_empty_div_title"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">
                            {messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_PENDING_TITLE")}
                        </div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aPendingNodes}</ul>
                    </div>
                </div>
            </div>
        );
    }

    private renderLanguageItems(type: string, isSupport: boolean): React.ReactNode[] {
        const languageSupport = languageSupportSource;
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
        const languageName = languageMessageBundle.getText(`LANGUAGE_${language}`);
        const fnChangeLanguage = () => {
            Language.set(parseAreaString(language));
            pageRefresh();
            // go("");
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
                        placeholder={messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_PENDING_MOUSE_HOLDER")}>
                        {languageName}
                    </div>
                )}
            </li>
        );
    }
}
