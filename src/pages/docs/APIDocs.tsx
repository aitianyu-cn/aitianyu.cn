/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "../common/TYDynamicPage";
import { APIDocsDisplayType, getAPIDocsDisplayType, getAPIDocsRemote } from "./APIDocsHelper";
import { APIMemberDocs } from "./APIMemberDocs";
import { APINamespaceDocs } from "./APINamespaceDocs";
import { IAPIPackage } from "./component/APIPackageItem";

import "./css/docs.api.css";

export class APIDocs extends TYDynamicPage {
    private packages: IAPIPackage[];

    private displayType: APIDocsDisplayType;

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_API_TITLE",
            key: `aitianyu_cn_docs_api`,
            id: getAPIDocsRemote(),
            remote: `project_docs/apibrowser`,
            cache: true,
            staticCache: false,
        });

        this.displayType = getAPIDocsDisplayType();
        this.packages = [];

        if (this.displayType === APIDocsDisplayType.Unknown) {
            window.location.pathname = "/error/404";
        }
    }

    protected override loadDataSuccess(): void {
        const rawData = this.getReceiveData();

        if (!Array.isArray(rawData)) {
            window.location.pathname = "/error/603";
            return;
        }
    }

    protected override renderLoaded(): React.ReactNode {
        if (this.displayType === APIDocsDisplayType.Members) {
            return <APIMemberDocs members={this.getReceiveData()} project={this.sId || ""} />;
        }

        if (this.displayType === APIDocsDisplayType.Item) {
            return;
        }

        return this.renderNamespaces();
    }

    private renderNamespaces(): React.ReactNode {
        const namespaceDocs = new APINamespaceDocs(this.getReceiveData(), this.sId || "", this.msgBundle);

        return namespaceDocs.render();
    }
}
