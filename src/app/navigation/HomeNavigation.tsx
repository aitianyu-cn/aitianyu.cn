/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { isMobile } from "react-device-detect";
import { MobileNavigation } from "./MobileNavigation";
import { HorizontalNavigation } from "./HorizontalNavigation";

export class HomeNavigation extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        if (isMobile) {
            return this.mobileNavigate();
        }

        return this.normalNavigate();
    }

    private mobileNavigate(): React.ReactNode {
        return <MobileNavigation />;
    }

    private normalNavigate(): React.ReactNode {
        return <HorizontalNavigation />;
    }
}
