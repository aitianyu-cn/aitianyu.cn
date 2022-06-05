/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "./TYDynamicPage";

export abstract class TYStructurePage extends TYDynamicPage {
    private preHashChanged: ((ev: HashChangeEvent) => void) | null;

    public constructor(props: IShellProperty) {
        super(props);

        this.preHashChanged = null;
    }

    protected override renderLoaded(): React.ReactNode {
        return <div></div>;
    }
    protected override componmentMounted(): void {
        this.preHashChanged = window.onhashchange;
        window.onhashchange = this.onHashChanged.bind(this);
    }
    protected override componmentWillUnmounted(): void {
        window.onhashchange = this.preHashChanged;
    }

    protected abstract renderSelectBar(): React.ReactNode[];
    protected abstract renderBody(): React.ReactNode;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onHashChanged(ev: HashChangeEvent): any {
        if (this.preHashChanged) {
            this.preHashChanged(ev);
        }

        console.log(ev.newURL);
    }
}
