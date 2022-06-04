/**@format */

import React from "react";
import { IMsgBundle } from "src/dty/i18n/MsgBundle";
import { APIPackageItem, IAPIPackage } from "./component/APIPackageItem";

export class APINamespaceDocs {
    private packages: IAPIPackage[];
    private msgBundle: IMsgBundle;
    private sId: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(rawData: any, sId: string, msgBundle: IMsgBundle) {
        this.packages = [];
        this.sId = sId;
        this.msgBundle = msgBundle;

        this.processNamespaces(rawData);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private processNamespaces(rawData: any): void {
        for (const item of rawData) {
            const packageItem: IAPIPackage = {
                def: item["def"] || "",
                api: item["id"] || "",
                i18n: item["i18n"] || "",
                packageName: item["packageName"] || "",
            };

            this.packages.push(packageItem);
        }
    }

    public render(): React.ReactNode {
        return (
            <div className="docs_api_base">
                {this.renderTitle()}
                {this.renderAPITable()}
            </div>
        );
    }

    private renderTitle(): React.ReactNode {
        return (
            <div className="docs_api_title_base">
                <div className="docs_api_title_project_name">{this.msgBundle.getI18n(this.sId || "")}</div>
                <div className="docs_api_title_api_reference">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TITLE")}</div>
            </div>
        );
    }

    private renderAPITable(): React.ReactNode {
        const renderItem: React.ReactNode[] = [];

        for (const item of this.packages) {
            const apiItem = new APIPackageItem(this.sId || "", item, this.msgBundle);

            renderItem.push(apiItem.render());
        }

        return (
            <div className="docs_api_table_base">
                <div className="docs_api_table_item_title">
                    <div className="docs_api_table_item_title_name">
                        {this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TABLE_ITEM_TITLE_NAME")}
                    </div>
                    <div className="docs_api_table_item_title_desc">
                        {this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TABLE_ITEM_TITLE_DESC")}
                    </div>
                </div>
                {renderItem}
            </div>
        );
    }
}
