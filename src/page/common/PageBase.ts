/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

export class PageBase extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }
}
