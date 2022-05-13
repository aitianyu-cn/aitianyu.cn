/**@format */

import React from "react";
import { IShellProperty } from "../model/IShellProperty";
import { IShellState } from "../model/IShellState";

export class TianyuBackground extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return <div></div>;
    }
}
