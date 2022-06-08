/**@format */

import React from "react";
import ReactMarkdown from "react-markdown";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "src/pages/common/TYDynamicPage";
import { getArchDocsRemote, getArchDocsView, getLanguage } from "../../APIDocsHelper";

import "./docs.comp.arch.view.css";
import "github-markdown-css/github-markdown.css";
import { isMobile } from "react-device-detect";

export class ArchitectureView extends TYDynamicPage {
    private sMarkdown: string;

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: `PROJECT_DOCS_ARCH_VIEW_${getArchDocsRemote()
                .replace("-", "_")
                .toUpperCase()}_${getArchDocsView().toUpperCase()}`,
            key: `aitianyu_cn_docs_arch_view_${getArchDocsRemote()}_${getArchDocsView()}`,
            id: `${getArchDocsRemote()}/${getLanguage()}/${getArchDocsView()}.md`,
            remote: `/resources/arch`,
            fetchResult: "text",
        });

        this.sMarkdown = "";
    }

    protected renderLoaded(): React.ReactNode {
        return (
            <div className="docs_comp_arch_view">
                <div className="docs_comp_arch_view_base">
                    <div className="docs_comp_arch_view_turnback_container">
                        <img
                            className={`${
                                isMobile ? "docs_api_title_project_turn_back_img_mob" : "docs_api_title_project_turn_back_img"
                            } "docs_comp_arch_view_turnback"`}
                            onClick={this.onBackToNamespaceList.bind(this)}
                            src="/assert/navigate/turnback.gif"
                            alt={this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TURN_BACK")}
                        />
                    </div>
                    <ReactMarkdown className="docs_comp_arch_view_content markdown-body">{this.sMarkdown}</ReactMarkdown>
                </div>
            </div>
        );
    }

    protected renderError(): React.ReactNode {
        return (
            <div className="docs_comp_arch_view">
                <div className="docs_comp_arch_view_base">
                    <img
                        className={`${
                            isMobile ? "docs_api_title_project_turn_back_img_mob" : "docs_api_title_project_turn_back_img"
                        } "docs_comp_arch_view_turnback"`}
                        onClick={this.onBackToNamespaceList.bind(this)}
                        src="/assert/navigate/turnback.gif"
                        alt={this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TURN_BACK")}
                        style={{ gridRow: 2 }}
                    />
                    <div className="docs_comp_arch_view_content">
                        <h2 className="docs_comp_arch_view_empty">{this.msgBundle.getI18n("PROJECT_DOCS_ARCH_VIEW_NO_DOCS")}</h2>
                    </div>
                </div>
            </div>
        );
    }

    protected override loadDataSuccess(): void {
        this.sMarkdown = (this.getReceiveData() as string) || "";

        if (!this.sMarkdown) {
            throw Error();
        }
    }

    private onBackToNamespaceList(): void {
        window.location.hash = "";
    }
}
