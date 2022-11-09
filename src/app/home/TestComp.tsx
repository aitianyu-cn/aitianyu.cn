/**@format */

import React from "react";
import { IReactContentComponent } from "tianyu-shell/ui/react/modules/content/Interface";

export interface ITestCompProps extends IReactContentComponent {
    data: string;
}

export class TestComp extends React.Component<IReactProperty, IReactState> {
    public render(): React.ReactNode {
        return <div>{this.props["data"] || "no data"}</div>;
    }
}
