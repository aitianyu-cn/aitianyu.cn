/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "../common/TYDynamicPage";

import "./css/docs.css";

export class Docs extends TYDynamicPage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private aProjects: string[];

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_TITLE",
            remote: "project_docs/apibrowser",
            key: "aitianyu_cn_docs",
            cache: true,
            staticCache: false,
        });

        this.aProjects = [];
    }

    protected override renderLoaded(): React.ReactNode {
        const isEmpty = this.aProjects.length === 0;

        if (isEmpty) {
            return <div className="docs_baseGrid">{this.renderEmptyProjects()}</div>;
        }

        return (
            <div className="docs_baseGrid_2">
                {this.renderProjects()}
                {this.renderProjectSelector()}
            </div>
        );
    }

    protected override loadDataSuccess(): void {
        if (Array.isArray(this.getReceiveData())) {
            this.aProjects.push(...this.getReceiveData());
        }
    }

    private renderEmptyProjects(): React.ReactNode {
        return <div className="docs_selector_no_language">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_NOT_AVAILABLE")}</div>;
    }

    private renderProjects(): React.ReactNode {
        return <div className="docs_title_base">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TITLE")}</div>;
    }

    private renderProjectSelector(): React.ReactNode {
        const aAPILanguageItemList: React.ReactNode[] = [];
        for (const project of this.aProjects) {
            const path = `/docs/api/${project}`;

            const apiLangItem = (
                <div key={project} className={isMobile ? "docs_selector_list_item_mob" : "docs_selector_list_item"}>
                    {this.msgBundle.getI18n(project)}
                </div>
            );

            aAPILanguageItemList.push(apiLangItem);
        }

        return <div className={isMobile ? "docs_selector_list_base_mob" : "docs_selector_list_base"}>{aAPILanguageItemList}</div>;
    }
}
