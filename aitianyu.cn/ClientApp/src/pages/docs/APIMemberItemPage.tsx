/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { getAPIDocsRemote } from "./APIDocsHelper";

export class APIMemberItemPage extends TYViewComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private sourceData: any;

    private project: string;
    private packageName: string;
    private member: string;

    public constructor(props: IShellProperty) {
        super(props);

        this.sourceData = props["src"];

        const remote = getAPIDocsRemote();
        const aPathItems = remote.split("/");

        this.project = aPathItems[0];
        this.packageName = aPathItems[1];
        this.member = aPathItems[2];
    }

    public render(): React.ReactNode {
        return <div></div>;
    }
}
