/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { getLocationPath } from "src/dty/RouterHelper";
import { TYStructurePage } from "../common/TYStructurePage";

export class ArchitectureDocs extends TYStructurePage {
    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_ARCH_TITLE",
            key: "aitianyu_cn_docs_arch",
            id: getLocationPath(-1),
            remote: "project_docs/archbrowser",
            resource: "arch",
            cache: true,
            staticCache: false,
        });
    }

    protected override renderSelectBar(): React.ReactNode[] {
        return [];
    }
    protected override renderBody(): React.ReactNode {
        return <div></div>;
    }
}
