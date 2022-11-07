/**@format */

import React from "react";
import { guid } from "ts-core/Guid";
import { ReactModule } from "../ReactModuleBase";

import "./css/navigation-item.css";

const REACT_NAVIGATION_ITEM_DEFAULT_SIZE: number = 10;

const REACT_NAVIGATION_ITEM_SIDE_PADDING: number = 15;

export interface IReactNavigationItemProperty extends IReactProperty {}

export class ReactNavigationItem extends ReactModule<IReactNavigationItemProperty> {
    protected id: string;
    protected key: string;
    protected icon: string;
    protected select: boolean;
    protected index: number;
    protected fontSize: number;
    protected assist: boolean;

    private isloaded: boolean;

    public constructor(props?: IReactNavigationItemProperty) {
        super(props);

        this.id = props?.["id"].toString() || guid();
        this.key = props?.["key"].toString() || "";
        this.icon = props?.["icon"].toString() || "";
        this.select = !!props?.["selected"];
        this.assist = !!props?.["assist"];

        this.isloaded = false;

        const fronSizeRawFromProps = props?.["fontSize"];
        const frontSizeFromProps = Number.parseInt((fronSizeRawFromProps || REACT_NAVIGATION_ITEM_DEFAULT_SIZE).toString());
        this.fontSize = (!Number.isNaN(frontSizeFromProps) && frontSizeFromProps) || REACT_NAVIGATION_ITEM_DEFAULT_SIZE;

        const indexFromProps = props?.["index"];
        this.index = (typeof indexFromProps === "number" && indexFromProps) || -1;
    }

    public override componentDidMount(): void {
        this.isloaded = true;
    }

    public override componentWillUnmount(): void {
        this.isloaded = false;
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (this.isloaded) {
            super.forceUpdate(callback);
        }
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

    public calculateWidth(context?: CanvasRenderingContext2D): number {
        if (context) {
            return context.measureText(this.key).width + REACT_NAVIGATION_ITEM_SIDE_PADDING * 2;
        }

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
                <div
                    key={this.key}
                    onClick={this.onClick.bind(this)}
                    className={`r_hn_i_d_b ${this.select ? "r_hn_i_d_b_a_s" : "r_hn_i_d_b_a_us"}`}>
                    <img className="r_hn_i_d_i" src={this.icon} alt={this.key} />
                </div>
            );
        }

        return (
            <div
                key={this.key}
                onClick={this.onClick.bind(this)}
                className={`r_hn_i_d_b ${this.select ? "r_hn_i_d_b_s" : "r_hn_i_d_b_us"}`}>
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

    protected onClick(): void {
        tianyuShell.core.runtime?.router?.jump(this.id);
    }
}
