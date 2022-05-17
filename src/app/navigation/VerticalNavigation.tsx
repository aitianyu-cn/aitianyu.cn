/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/verti.main.css";

export interface IVerticalSubItem {
    desc: string;
    key: string;
    sub: IVerticalSubItem[];
}

export interface IVerticalItem {
    pic: string;
    desc: string;
    key: string;
    sub: IVerticalSubItem[];
}

export class VerticalNavigation extends React.Component<IShellProperty, IShellState> {
    private navigationItems: IVerticalItem[];

    public constructor(navigationItems: IVerticalItem[] = []) {
        super({});

        this.navigationItems = navigationItems;
    }

    public render(): React.ReactNode {
        return <div className="vertical_navigation_root"></div>;
    }
}
