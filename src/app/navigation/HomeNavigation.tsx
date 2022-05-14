/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { HorizontalNavigation } from "./HorizontalNavigation";

export class HomeNavigation extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return this.normalNavigate();
    }

    private normalNavigate(): React.ReactNode {
        return <HorizontalNavigation />;
    }
}
