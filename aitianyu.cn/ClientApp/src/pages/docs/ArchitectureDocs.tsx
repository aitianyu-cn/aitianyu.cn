/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { getLocationPath } from "src/dty/RouterHelper";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { ArchitectureSelector } from "./component/arch/ArchitectureSelector";
import { ArchitectureView } from "./component/arch/ArchitectureView";

export class ArchitectureDocs extends TYViewComponent {
    private preHash: ((ev: HashChangeEvent) => void) | null;

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

        this.preHash = null;
    }

    public componentDidMount(): void {
        this.preHash = window.onhashchange;
        window.onhashchange = this.onHashChanged.bind(this);
    }

    public componentWillUnmount(): void {
        window.onhashchange = this.preHash;
    }

    public render(): React.ReactNode {
        const hash = window.location.hash;
        if (!hash || hash === "#") {
            return <ArchitectureSelector />;
        }

        return this.renderDocument();
    }

    private renderDocument(): React.ReactNode {
        return <ArchitectureView />;
    }

    private onHashChanged(ev: HashChangeEvent): void {
        if (this.preHash) {
            this.preHash(ev);
        }

        this.forceUpdate();
    }
}

// export class ArchitectureDocs extends TYStructurePage {
//     public constructor(props: IShellProperty) {
//         super({
//             ...props,
//             title: "PROJECT_DOCS_ARCH_TITLE",
//             key: "aitianyu_cn_docs_arch",
//             id: getLocationPath(-1),
//             remote: "project_docs/archbrowser",
//             resource: "arch",
//             cache: true,
//             staticCache: false,
//         });
//     }

//     protected override renderSelectBar(): React.ReactNode[] {
//         return [];
//     }
//     protected override renderBody(): React.ReactNode {
//         return <div></div>;
//     }
// }
