/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { IContentCallback } from "./interface/ContentCallback";

import "./css/item.default.css";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

export class NavigationItem extends React.Component<IShellProperty, IShellState> {
    private sKey: string;
    private oContentCallback: IContentCallback;
    private oContent: React.ReactNode | null;
    private isSelected: boolean;

    public constructor(key: string, callBack: IContentCallback) {
        super({});

        this.state = { selected: false };

        this.sKey = key;
        this.oContentCallback = callBack;
        this.oContent = null;
        this.isSelected = false;
    }

    public setSelected(isSelected: boolean): void {
        this.isSelected = isSelected;
    }

    public getSelected(): boolean {
        return this.isSelected;
    }

    public setContent(content: React.ReactNode): void {
        this.oContent = content;
    }

    public render(): React.ReactNode {
        const content: React.ReactNode = this.oContent ?? <h1>空</h1>;
        const path = `/${this.sKey}`;
        return (
            <Link key={this.sKey} to={path} className="navigation_item_default_itemLink" onClick={this.onClick.bind(this)}>
                <div className={isMobile ? "navigation_item_default_itemBase_mob" : "navigation_item_default_itemBase"}>
                    <div className="navigation_item_default_itemContainer">{content}</div>
                    {this.isSelected && (
                        <div
                            className={
                                isMobile ? "navigation_item_default_selected_mob" : "navigation_item_default_selected"
                            }></div>
                    )}
                </div>
            </Link>
        );
    }

    private onClick(): void {
        this.oContentCallback.switchNavigation(this.sKey);
    }
}
