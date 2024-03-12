/**@format */

import { Language, ITianyuShell } from "@aitianyu.cn/tianyu-shell/core";
import { parseAreaString } from "@aitianyu.cn/types";
import React from "react";
import { PageHelper } from "ty-infra/core/PageHelper";
import { IReactProperty, IReactState } from "ty-infra/ui/model/React";

import * as MessageBundle from "ty-home/i18n/MessageBundle";

import "../css/language.css";

declare const tianyuShell: ITianyuShell;

export interface ILanguageProperty extends IReactProperty {}

const languageSupportSource: any = {
    support: tianyuShell.core.language?.supportLanguage,
    pending: tianyuShell.core.language?.pendingLanguage,
};

export class LanguageFrame extends React.Component<ILanguageProperty, IReactState> {
    public constructor(props: ILanguageProperty) {
        super(props);

        document.title = MessageBundle.getText("HOME_PAGE_LANGUAGE_TITLE");
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
                        {MessageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_INTERNAL_TITLE")}
                    </div>
                    <div className="language_start_empty_div"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">
                            {MessageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_SUPPORT_TITLE")}
                        </div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aSupportNodes}</ul>
                    </div>
                    <div className="language_start_empty_div_title"></div>
                    <div className="language_supported_content">
                        <div className="language_supported_title">
                            {MessageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_PENDING_TITLE")}
                        </div>
                        <div className="language_div_splite"></div>
                        <ul className="language_supported_list">{aPendingNodes}</ul>
                    </div>
                </div>
                <div style={{ height: "30px" }} />
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
        const languageName = MessageBundle.getText(`LANGUAGE_${language.toUpperCase()}`);
        const fnChangeLanguage = () => {
            Language.set(parseAreaString(language));
            PageHelper.refresh();
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
                        // placeholder={messageBundle.getText("HOME_PAGE_LANGUAGE_FRAME_LANGUAGE_PENDING_MOUSE_HOLDER")}
                    >
                        {languageName}
                    </div>
                )}
            </li>
        );
    }
}
