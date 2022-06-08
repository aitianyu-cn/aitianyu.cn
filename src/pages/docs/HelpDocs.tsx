/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "../common/TYDynamicPage";
import { IHelpMainfest } from "./component/help/IHelpMainfest";
import { getHelpDocsRemote } from "./DocsHelper";
import { HelpMarkdownView } from "./component/help/HelpMarkdownView";
import { isMobile } from "react-device-detect";
import { getArchDocsRemote, getArchDocsView, getLanguage } from "./APIDocsHelper";

import "./css/docs.help.css";
import "github-markdown-css/github-markdown.css";
import { IParameters } from "src/dty/model/Interfaces";

export class HelpDocs extends TYDynamicPage {
    private mainfest: IHelpMainfest | null;

    private oSelectorList: IParameters;

    private preHash: ((ev: HashChangeEvent) => void) | null;

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: `PROJECT_DOCS_HELP_${getHelpDocsRemote().replace("-", "_").toUpperCase()}_TITLE`,
            key: `aitianyu_cn_docs_help`,
            id: `${getHelpDocsRemote()}/mainfest.json`,
            remote: `/resources/help`,
        });

        this.oSelectorList = {};

        this.mainfest = null;
        this.preHash = null;
    }

    protected componmentMounted(): void {
        this.preHash = window.onhashchange;
        window.onhashchange = this.onHashChanged.bind(this);
    }

    protected componmentWillUnmounted(): void {
        window.onhashchange = this.preHash;
    }

    protected renderLoaded(): React.ReactNode {
        return (
            <div className="docs_help_base">
                <div className="docs_help_selector_base">{this.renderSelectorList()}</div>
                <div className="docs_help_view_base">{this.renderMarkdown()}</div>
            </div>
        );
    }

    protected override loadDataSuccess(): void {
        const receivedJson = this.getReceiveData();
        if (receivedJson) {
            this.mainfest = (receivedJson as IHelpMainfest) || null;
        }

        if (!this.mainfest) {
            throw Error();
        }

        if (!window.location.hash || window.location.hash === "#") {
            const defaultPage = this.mainfest.files[this.mainfest.default]?.file;
            if (defaultPage) {
                window.location.hash = `#${defaultPage}`;
            }
        }
    }

    private renderSelectorList(): React.ReactNode {
        const selectorList: React.ReactNode[] = [];
        const hash = window.location.hash.replaceAll("#", "");

        const files = this.mainfest?.files;
        if (files) {
            for (const file of Object.keys(files)) {
                const remote = files[file].file;
                const i18n = this.msgBundle.getI18n(files[file].i18n);

                this.oSelectorList[remote] = file;

                const fnClick = () => {
                    window.location.hash = `#${remote}`;
                };

                const fileItem = (
                    <div
                        id={`docs_help_selector_list_item_${file}`}
                        key={remote}
                        onClick={fnClick}
                        className={`${
                            isMobile ? "docs_api_member_content_member_list_item_mob" : "docs_api_member_content_member_list_item"
                        } ${hash === remote ? "docs_api_member_content_member_list_item_selected" : ""}`}>
                        {i18n}
                    </div>
                );

                selectorList.push(fileItem);
            }
        }

        return <div className="docs_api_member_content_member_list">{selectorList}</div>;
    }

    private renderMarkdown(): React.ReactNode {
        const hash = window.location.hash;
        if (!hash || hash === "#") {
            return <div></div>;
        }

        return (
            <HelpMarkdownView
                title={`PROJECT_DOCS_HELP_VIEW_${getArchDocsRemote()
                    .replace("-", "_")
                    .toUpperCase()}_${getArchDocsView().toUpperCase()}`}
                key={`aitianyu_cn_docs_help_view_${getArchDocsRemote()}_${getArchDocsView()}`}
                id={`${getArchDocsRemote()}/${getLanguage()}/${getArchDocsView()}.md`}
                remote={`/resources/help`}
                fetchResult={"text"}
            />
        );
    }

    // private onMemberSelected(hash: string): void {
    //     const memberName = this.oSelectorList[hash];

    //     if (this.isMemberSelected && this.selectedMember === memberName) {
    //         return;
    //     }

    //     if (this.selectedMember) {
    //         // reset style
    //         const element = document.getElementById(`docs_help_selector_list_item_${this.selectedMember}`);
    //         if (element) {
    //             element.classList.remove("docs_api_member_content_member_list_item_selected");
    //         }
    //     }

    //     // set style
    //     const element = document.getElementById(`docs_help_selector_list_item_${memberName}`);
    //     if (element) {
    //         element.classList.add("docs_api_member_content_member_list_item_selected");
    //     }

    //     this.selectedMember = memberName;
    //     this.isMemberSelected = true;

    //     window.location.hash = `#${hash}`;
    // }

    // private onMemberNoSelected(): void {
    //     if (this.selectedMember) {
    //         // reset style
    //         const element = document.getElementById(`docs_help_selector_list_item_${this.selectedMember}`);
    //         if (element) {
    //             element.classList.remove("docs_api_member_content_member_list_item_selected");
    //         }
    //     }

    //     this.selectedMember = "";
    //     this.isMemberSelected = false;
    // }

    private onHashChanged(ev: HashChangeEvent): void {
        if (this.preHash) {
            this.preHash(ev);
        }

        // const hash = window.location.hash.replaceAll("#", "");
        // if (!hash) {
        //     this.onMemberNoSelected();
        // }

        // if (this.oSelectorList[hash]) {
        //     this.onMemberSelected(hash);
        // }

        this.forceUpdate();
    }
}
