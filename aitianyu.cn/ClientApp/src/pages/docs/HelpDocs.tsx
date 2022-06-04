/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { getLocationPath } from "src/dty/RouterHelper";
import { TYDynamicPage } from "../common/TYDynamicPage";

export class HelpDocs extends TYDynamicPage {
    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_HELP_TITLE",
            key: `aitianyu_cn_docs_help`,
            id: getLocationPath(-1),
            remote: `project_docs/helpbrowser`,
            cache: true,
            staticCache: false,
        });
    }

    protected renderLoaded(): React.ReactNode {
        return <div></div>;
    }
}
