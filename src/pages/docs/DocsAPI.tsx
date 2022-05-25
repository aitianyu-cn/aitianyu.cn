/**@format */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { LogState } from "src/dty/core/LogState";
import { ConsoleLog } from "src/dty/LogHelper";

export class DocsAPI extends TYViewComponent {
    private aProjectList: string[];
    private isProjectsLoad: boolean;
    private errorWhileLoad: boolean;

    public constructor() {
        super({});

        this.aProjectList = [];
        this.isProjectsLoad = false;
        this.errorWhileLoad = false;

        document.title = this.msgBundle.getI18n("PROJECT_DOCS_API_TITLE");
    }

    public componentDidMount(): void {
        // window.onhashchange = this.onhashChanged.bind(this);
        if (this.errorWhileLoad || this.isProjectsLoad) {
            return;
        }

        this.loadData();
    }

    public render(): React.ReactNode {
        if (!this.isProjectsLoad && !this.errorWhileLoad) {
            return <div className="docs_api_baseGrid">{this.renderLoading()}</div>;
        }

        if (this.errorWhileLoad) {
            return <div className="docs_api_baseGrid">{this.renderLoadError()}</div>;
        }

        const isEmpty = this.aProjectList.length === 0;

        if (isEmpty) {
            return <div className="docs_api_baseGrid">{this.renderEmptyProjects()}</div>;
        }

        return (
            <div className="docs_api_baseGrid">
                {this.renderProjects()}
                {this.renderProjectSelector()}
            </div>
        );
    }

    private renderLoading(): React.ReactNode {
        return <div className="docs_api_title_base">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATA_LOADING")}</div>;
    }

    private renderLoadError(): React.ReactNode {
        return <div className="docs_api_title_base">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATA_LOAD_ERROR")}</div>;
    }

    private renderProjects(): React.ReactNode {
        return <div className="docs_api_title_base">{this.renderAPIExplorer()}</div>;
    }

    private renderAPIExplorer(): React.ReactNode {
        return <div className="">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TITLE")}</div>;
    }

    private renderEmptyProjects(): React.ReactNode {
        return <div className="docs_api_selector_no_language">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_NOT_AVAILABLE")}</div>;
    }

    private renderProjectSelector(): React.ReactNode {
        const aAPILanguageItemList: React.ReactNode[] = [];
        for (const apiLang of this.aProjectList) {
            const apiLangItem = (
                <Link
                    key={apiLang}
                    className={isMobile ? "docs_api_selector_list_item_mob" : "docs_api_selector_list_item"}
                    to={`/docs/api/${apiLang}`}>
                    {this.msgBundle.getI18n(apiLang)}
                </Link>
            );

            aAPILanguageItemList.push(apiLangItem);
        }

        return (
            <div className={isMobile ? "docs_api_selector_list_base_mob" : "docs_api_selector_list_base"}>
                {aAPILanguageItemList}
            </div>
        );
    }

    private onhashChanged(): void {
        this.forceUpdate();
    }

    private async loadData(): Promise<void> {
        try {
            const response = await fetch("project_docs/apibrowser");
            const data = await response.json();

            ConsoleLog(`DocsAPI: fetch data - ${data}`);
            if (Array.isArray(data)) {
                this.aProjectList.push(...data);
            } else {
                ConsoleLog(`DocsAPI: fetched data is Invalid - ${data}`, LogState.Warn);
            }

            this.isProjectsLoad = true;
            this.errorWhileLoad = false;
        } catch {
            ConsoleLog(`DocsAPI: fetch data Failed`, LogState.Warn);
            this.aProjectList = [];

            this.isProjectsLoad = false;
            this.errorWhileLoad = true;
        }

        this.forceUpdate();
    }
}
