/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { NavigationBase } from "./NavigationBase";

import "./css/horiz.main.css";
import { NavigationItem } from "./NavigationItem";
import { Link } from "react-router-dom";
import { getLocationPath } from "../../dty/common/RouteHelp";
import { MessageBundle } from "../../dty/common/i18n/MessageBundle";
import { Configure } from "../../dty/common/core/Configure";
import { AreaCode } from "../../dty/common/AreaCode";
import { IEventListener } from "../../dty/common/model/Events";
import { isMobile } from "react-device-detect";

export class HorizontalNavigation extends NavigationBase implements IEventListener<AreaCode>,  IEventListener<string> {
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

        const imgPath = `${process.env.PUBLIC_URL}/assert/language.png`;

        return (
            <div className="navigation_horiz_default_navigate">
                <div className="navigation_horiz_default_navigateBase">
                    <div className="navigation_horiz_default_headerTitle">
                        {
                            isMobile ? <h3>DEV</h3> : <h3>Development</h3>
                        }
                    </div>
                    <div className="navigation_horiz_default_headerNavigateBase">
                            <div className="navigation_horiz_default_navigationItemList">{aItems}</div>
                        
                    </div>
                    <div className="navigation_horiz_default_headerLangs">
                            <Link to="/language">
                                <div className="navigation_horiz_default_headerLangsSub">
                                    <img
                                        className="navigation_horiz_default_languagePic"
                                        src={imgPath}
                                        alt={this.getText("LANGUAGE_PAGE_ALT")}
                                        title={this.getText("LANGUAGE_PAGE_ALT")}
                                        onClick={this.toChangeLanguage.bind(this)}
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
        config.removeTrigger("horizontal_navigation");
    }

    public componentWillUnmount(): void {
        this.unMount();
    }

    public componentDidMount(): void {
        const config = Configure.generateConfigure();
        config.listenArea("horizontal_navigation", this);
        config.addTrigger("horizontal_navigation", this);
    }

    private beforeRender(): void {
        const path = getLocationPath();

        if (path === "language") {
            return;
        } else {
            const oNavigationItem = this.navigationItems[path || this.defaultNavigation || ""];
            if (oNavigationItem) {
                oNavigationItem.setSelected(true);
            }
        }
    }

    private toChangeLanguage(): void {
        if (this.isLanguagePage) {
            return;
        }

        this.switchNavigation("language");
    }

    public fire(event: AreaCode | string, sender?: any): void {
        if (typeof event === 'string') {
            this.switchNavigation(event as string);
        } else {
            this.switchNavigation(this.defaultNavigation ?? "");
        }
    }
    
    public removed(_sender?: any): void{
        // 
    }

    private loadNavigationItem(): void {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const titleFile = require("./res/titledef.json");

        this.defaultNavigation = titleFile["default"];

        for (const item of titleFile["items"] || []) {
            const sText = this.getText(item["text"] || "");
            this.addItem(item["key"], <div className="navigation_horiz_default_oNavigationItemStyle">{sText}</div>);
        }
    }

    private getText(text: string): string {
        return this.msgBundle.getText(text) || text;
    }

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
