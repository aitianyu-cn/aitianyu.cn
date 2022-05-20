/**@format */

import React from "react";
import { getMsgBundle, IMsgBundle } from "../i18n/MsgBundle";
import { IShellProperty, IShellState } from "../model/IShell";

export class TYViewComponent extends React.Component<IShellProperty, IShellState> {
    protected msgBundle: IMsgBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgBundle = getMsgBundle();
    }
}
