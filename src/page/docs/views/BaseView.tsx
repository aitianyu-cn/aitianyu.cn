/**@format */

import React from "react";
import { IShellProperty } from "../../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../../dty/frame/shell/model/IShellState";
import { MsgBundle } from "../MsgBundle";

export class DocsViewsBase extends React.Component<IShellProperty, IShellState> {
    protected msgBundle: MsgBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgBundle = MsgBundle.generateHelper();
    }
}
