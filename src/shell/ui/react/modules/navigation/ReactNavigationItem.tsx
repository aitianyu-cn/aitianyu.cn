/**@format */

import React from "react";
import { guid } from "ts-core/Guid";
import { ReactModule } from "../ReactModuleBase";

import "./css/navigation-item.css";

const REACT_NAVIGATION_ITEM_DEFAULT_SIZE: number = 10;

const REACT_NAVIGATION_ITEM_SIDE_PADDING: number = 15;

export class ReactNavigationItem extends ReactModule {
    protected id: string;
    protected key: string;
    protected icon: string;
    protected select: boolean;
    protected index: number;
    protected fontSize: number;
    protected assist: boolean;

    public constructor(props?: IReactProperty) {
        super(props);

        this.id = props?.["id"].toString() || guid();
        this.key = props?.["key"].toString() || "";
        this.icon = props?.["icon"].toString() || "";
        this.select = !!props?.["selected"];
        this.assist = !!props?.["assist"];

        const fronSizeRawFromProps = props?.["fontSize"];
        const frontSizeFromProps = Number.parseInt((fronSizeRawFromProps || REACT_NAVIGATION_ITEM_DEFAULT_SIZE).toString());
        this.fontSize = (!Number.isNaN(frontSizeFromProps) && frontSizeFromProps) || REACT_NAVIGATION_ITEM_DEFAULT_SIZE;

        const indexFromProps = props?.["index"];
        this.index = (typeof indexFromProps === "number" && indexFromProps) || -1;
    }

    public updateFontSize(size: number): void {
        this.fontSize = size;
    }

    public setSelect(): void {
        if (this.select) return;

        this.select = true;
        this.forceUpdate();
    }

    public setUnselect(): void {
        if (!this.select) return;

        this.select = false;
        this.forceUpdate();
    }

    public getSelection(): boolean {
        return this.select;
    }

    public getKey(): string {
        return this.key;
    }

    public getIcon(): string {
        return this.icon;
    }

    public getAssist(): boolean {
        return this.assist;
    }

    public getIndex(): number {
        return this.index;
    }

    public calculateWidth(): number {
        // const codedString = encodeURI(this.key);
        return this.key.length * this.fontSize + REACT_NAVIGATION_ITEM_SIDE_PADDING * 2;
    }

    public calculateHidth(): number {
        return this.fontSize;
    }

    /**
     * render for mobile.
     *
     * @returns {React.ReactNode} return react node
     */
    public renderForMobile(): React.ReactNode {
        return <div></div>;
    }

    /**
     * render for normal display case.
     *
     * @returns {React.ReactNode} return react node
     */
    public renderForNormal(): React.ReactNode {
        if (this.assist) {
            return (
                <div onClick={this.onClick.bind(this)} className="r_hn_i_d_b">
                    assit
                </div>
            );
        }

        return (
            <div onClick={this.onClick.bind(this)} className="r_hn_i_d_b">
                {this.key}
            </div>
        );
    }

    /**
     * render for narrow page case.
     *
     * @returns {React.ReactNode} return react node
     */
    public renderForNarrow(): React.ReactNode {
        return <div></div>;
    }

    private onClick(): void {
        tianyuShell.core.runtime?.router?.jump(this.id);
    }
}
