/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { NavigationBase } from "./NavigationBase";

export class MobileNavigation extends NavigationBase {
    public constructor(props: IShellProperty) {
        super(props);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public addItem(key: string, content: React.ReactNode): void {}

    /**
     *
     * @param itemKey
     *
     * @override
     */
    public switchNavigation(itemKey: string): void {
        throw new Error("Method not implemented.");
    }

    public render(): React.ReactNode {
        return <div>123</div>;
    }
}
