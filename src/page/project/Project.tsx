/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/main.css";

export class Project extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const aNodes: React.ReactNode[] = [];
        for (let i = 0; i < 1; ++i) aNodes.push(<h1 key={i}>开发中</h1>);

        return (
            <div className="baseGrid">
                <div className="content"></div>
                <div className="content">{aNodes}</div>
            </div>
        );
    }
}
