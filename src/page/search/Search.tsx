/**@format */

import React from "react";
import { Configure } from "../../dty/common/core/Configure";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { PageBase } from "../common/PageBase";

import "./css/main.css";
import { MsgBundle } from "./MsgBundle";
import { getSearchParameters, getSearchType } from "./SearchHelper";

export class Search extends PageBase {
    private msgBundle: MsgBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgBundle = MsgBundle.generateHelper();
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    public componentDidMount() {
        // this.triggerNavigation();
    }

    private renderNormal(): React.ReactNode {
        const searchType = getSearchType();
        const searches = getSearchParameters();

        const searchDivs: React.ReactNode[] = [];
        for (const search of searches) {
            searchDivs.push(
                <div id={search.key}>
                    {search.key} {search.value}
                </div>,
            );
        }

        return (
            <div className="error_page_base_container">
                <div className="error_page_base_msg error_page_base_404">{this.msgBundle.getI18nText("404_OPS_MSG")}</div>
                <div className="error_page_base_msg error_page_base_error">{searchType}~</div>
                <div className="error_page_base_msg error_page_base_desc">{searchDivs}</div>
                <div className="error_page_base_msg error_page_base_desc">{this.msgBundle.getI18nText("404_OP2_MSG")}</div>
            </div>
        );
    }

    private triggerNavigation(): void {
        const config = Configure.generateConfigure();
        config.trigger("horizontal_navigation", { obj: "error" }, this);
    }
}
