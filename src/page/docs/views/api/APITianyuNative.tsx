/**@format */

import React from "react";
import { DocsAPIViewsBase } from "./APIBaseView";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const oAPICppSource = require("./cpp/namespace.json");

export class DocsAPITianyuNative extends DocsAPIViewsBase {
    public constructor() {
        super();

        document.title = this.msgBundle.getI18nText("PROJECT_DOCS_API_TIANYU_NATIVE_TITLE");
    }

    public render(): React.ReactNode {
        return (
            <div className="docs_api_base_view_baseGrid">
                <div className="docs_api_base_view_inner_grid">
                    {this.msgBundle.getI18nText("TIANYU_DEV_DOCS_API_SOURCE_EMPTY")}
                </div>
            </div>
        );
    }
}
