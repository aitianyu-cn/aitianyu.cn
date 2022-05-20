/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { IContentCallback } from "./interface/ContentCallback";
import { NavigationItem } from "./NavigationItem";

export interface INavigationItems {
    [key: string]: NavigationItem;
}

export abstract class NavigationBase extends TYViewComponent implements IContentCallback {
    protected navigationItems: INavigationItems;

    public constructor(props: IShellProperty) {
        super(props);

        this.navigationItems = {};
    }

    public abstract addItem(key: string, content: React.ReactNode): void;
    /**
     *
     * @param itemKey
     *
     * @abstract
     */
    public abstract switchNavigation(itemKey: string): void;
}
