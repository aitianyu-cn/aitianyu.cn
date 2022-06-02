/**@format */

import React from "react";
import { IMsgBundle } from "src/dty/i18n/MsgBundle";

import "./docs.api.item.css";

export interface IAPIPackage {
    def: string;
    api: string;
    i18n: string;
}

export class APIPackageItem {
    private def: string;
    private api: string;
    private i18n: string;

    private project: string;

    private msgBundle: IMsgBundle;

    public constructor(project: string, pack: IAPIPackage, msgBundle: IMsgBundle) {
        this.msgBundle = msgBundle;

        this.project = project;

        this.api = pack.api;
        this.def = pack.def;
        this.i18n = msgBundle.getI18n(pack.i18n);
    }

    public render(): React.ReactNode {
        return (
            <div key={this.api} className="docs_api_table_item_base">
                <a href={`/docs/api/${this.project}/${this.api}`} className="docs_api_table_item_name">
                    {this.api}
                </a>
                <div className="docs_api_table_item_desc">{this.i18n}</div>
            </div>
        );
    }
}
