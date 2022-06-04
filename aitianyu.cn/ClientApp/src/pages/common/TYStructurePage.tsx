/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "./TYDynamicPage";

export abstract class TYStructurePage extends TYDynamicPage {
    public constructor(props: IShellProperty) {
        super(props);
    }

    protected override renderLoaded(): React.ReactNode {
        return <div></div>;
    }
    protected override componmentMounted(): void {
        window.onhashchange = this.onHashChanged.bind(this);
    }
    protected override componmentWillUnmounted(): void {
        window.onhashchange = null;
    }

    protected abstract renderSelectBar(): React.ReactNode[];
    protected abstract renderBody(): React.ReactNode;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onHashChanged(ev: HashChangeEvent): any {
        console.log(ev.newURL);
    }
}
