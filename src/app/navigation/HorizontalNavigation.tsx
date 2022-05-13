/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { NavigationBase } from "./NavigationBase";

import "./css/horiz.main.css";
import { NavigationItem } from "./NavigationItem";
import { Link } from "react-router-dom";
import { getDecodeHash, getLocationHash } from "../../dty/common/RouteHelp";
import { MessageBundle } from "../../dty/common/i18n/MessageBundle";
import { Configure } from "../../dty/common/core/Configure";
import { AreaCode } from "../../dty/common/AreaCode";
import { IEventListener } from "../../dty/common/model/Events";

export class HorizontalNavigation extends NavigationBase implements IEventListener<AreaCode> {
    private isLanguagePage: boolean;
    private msgBundle: MessageBundle;

    private defaultNavigation: string | null;

    public constructor(props: IShellProperty) {
        super(props);

        this.isLanguagePage = false;
        this.defaultNavigation = null;
        this.state = {};

        this.msgBundle = new MessageBundle(HorizontalNavigation.getI18nObject());

        this.loadNavigationItem();

        this.beforeRender();
    }

    public addItem(key: string, content: React.ReactNode): void {
        const item: NavigationItem = new NavigationItem(key, this);
        item.setContent(content);

        this.navigationItems[key] = item;
    }
    /**
     *
     * @param itemKey
     *
     * @override
     */
    public switchNavigation(itemKey: string): void {
        const aItemKeys: string[] = Object.keys(this.navigationItems);

        this.isLanguagePage = itemKey === "language";

        let isNeedRedraw = false;
        for (const key of aItemKeys) {
            const oItem: NavigationItem = this.navigationItems[key];
            if (key === itemKey) {
                if (!oItem.getSelected()) {
                    oItem.setSelected(true);
                    isNeedRedraw = true;
                }
            } else {
                oItem.setSelected(false);
            }
        }

        if (isNeedRedraw || this.isLanguagePage) {
            this.forceUpdate();
        }
    }

    public startRender(): React.ReactNode {
        this.beforeRender();

        return this.render();
    }

    public render(): React.ReactNode {
        const aItems: React.ReactNode[] = [];
        const aItemKeys: string[] = Object.keys(this.navigationItems);
        for (const key of aItemKeys) aItems.push(this.navigationItems[key].render());

        const config = Configure.generateConfigure();
        config.listenArea("horizontal_navigation", this);

        return (
            <div className="navigation_horiz_default_navigate">
                <div className="navigation_horiz_default_navigateBase">
                    <div className="navigation_horiz_default_headerTitle">
                        <h3>Development</h3>
                    </div>
                    <div className="navigation_horiz_default_headerNavigateBase">
                            <div className="navigation_horiz_default_navigationItemList">{aItems}</div>
                        
                    </div>
                    <div className="navigation_horiz_default_headerLangs">
                            <Link to="/language">
                                <div className="navigation_horiz_default_headerLangsSub">
                                    <img
                                        className="navigation_horiz_default_languagePic"
                                        src="assert/language.png"
                                        alt={this.getI18nText("LANGUAGE_PAGE_ALT")}
                                        title={this.getI18nText("LANGUAGE_PAGE_ALT")}
                                        onClick={this.onChangeLanguage.bind(this)}
                                    />
                                </div>
                            </Link>
                    </div>
                </div>
            </div>
        );
    }

    public unMount(): void {
        const config = Configure.generateConfigure();
        config.notListenArea("horizontal_navigation");
    }

    private beforeRender(): void {
        const hash = getLocationHash(0);
        if (hash === null) {
            return;
        }

        const oHAP = getDecodeHash(hash);
        if (oHAP.hash === "language") {
            return;
        } else {
            const oNavigationItem = this.navigationItems[oHAP.hash ?? this.defaultNavigation ?? ""];
            if (oNavigationItem) {
                oNavigationItem.setSelected(true);
            }
        }
    }

    private onChangeLanguage(): void {
        if (this.isLanguagePage) {
            return;
        }

        this.switchNavigation("language");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public fire(event: AreaCode, sender?: any): void {
        this.switchNavigation(this.defaultNavigation ?? "");
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public removed(_sender?: any): void{
        // 
    }

    private loadNavigationItem(): void {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const titleFile = require("./res/titledef.json");

        this.defaultNavigation = titleFile["default"];

        for (const item of titleFile["items"] || []) {
            const sText = this.getI18nText(item["text"] || "");
            this.addItem(item["key"], <div className="navigation_horiz_default_oNavigationItemStyle">{sText}</div>);
        }
    }

    private getI18nText(text: string): string {
        return this.msgBundle.getText(text) || text;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static getI18nObject(): any {
        const oConfig = Configure.generateConfigure();
        switch (oConfig.getArea()) {
            case AreaCode.en_US:
                return require("./res/i18n/international_en_US.json");
            case AreaCode.zh_CN:
            default:
                return require("./res/i18n/international_zh_CN.json");
        }
    }
}
