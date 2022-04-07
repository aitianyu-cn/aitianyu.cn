/**@format */

import React from "react";
import { IShellProperty } from "./model/IShellProperty";
import { IShellState } from "./model/IShellState";
import { TianyuBackground } from "./view/TianyuBackground";
import { TianyuDialog } from "./view/TianyuDialog";
import { TianyuMessage } from "./view/TianyuMessage";
import { TianyuSpace } from "./view/TianyuSpace";

export class TianyuShell extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public initialShell(): void {}

    public render(): React.ReactNode {
        return (
            <div>
                <TianyuBackground />
                <TianyuSpace />
                <TianyuMessage />
                <TianyuDialog />
            </div>
        );
    }

    private beforeRender(): React.ReactNode {
        return (
            <div>
                <TianyuBackground />
                <TianyuSpace />
                <TianyuMessage />
                <TianyuDialog />
            </div>
        );
    }
}
