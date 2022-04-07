/**@format */

import React from "react";
import { IShellProperty } from "tyshell/model/IShellProperty";
import { IShellState } from "tyshell/model/IShellState";

export class TianyuSpace extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    private renderHeader(): React.ReactNode {}
    private renderBody(): React.ReactNode {}
    private renderFooter(): React.ReactNode {}

    public render(): React.ReactNode {
        return <div></div>;
    }
}
