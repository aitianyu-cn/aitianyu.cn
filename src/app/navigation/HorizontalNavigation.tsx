/**@format */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { NavigationBase } from "./NavigationBase";

import { NavigationItem } from "./NavigationItem";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "src/dty/model/IShell";
import { Configure, ITriggerData } from "src/dty/core/Configure";
import { getLocationPath } from "src/dty/RouterHelper";

import { FeatureToggle } from "src/dty/core/FeatureToggle";
import { ConsoleLog } from "src/dty/LogHelper";

import "./css/horiz.main.css";

export class HorizontalNavigation extends NavigationBase {
    private isLanguagePage: boolean;

    private defaultNavigation: string | null;

    public constructor(props: IShellProperty) {
        super(props);

        this.isLanguagePage = window.location.pathname === "/language";
        this.defaultNavigation = null;
        this.state = {};

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
        if (FeatureToggle.isActive("AITIANYU_CN_WEB_DEBUG_LOG")) {
            console.log(`HorizontalNavigation: navigation change to - ${itemKey}`);
        }

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
                isNeedRedraw = isNeedRedraw || oItem.getSelected();
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

        const imgPath = `/assert/language.gif`;

        return (
            <div className="navigation_horiz_default_navigate">
                <div className="navigation_horiz_default_navigateBase">
                    <div className="navigation_horiz_default_headerTitle">
                        {isMobile ? <div>DEV</div> : <div>Development</div>}
                    </div>
                    <div className="navigation_horiz_default_headerNavigateBase">
                        <div className="navigation_horiz_default_navigationItemList">{aItems}</div>
                    </div>
                    <div className="navigation_horiz_default_headerLangs">
                        <div className="navigation_horiz_default_headerLangsSub">
                            <div className="navigation_horiz_default_language_anim">
                                <Link to="/language" className="navigation_horiz_default_language_link">
                                    <img
                                        className="navigation_horiz_default_languagePic"
                                        src={imgPath}
                                        alt={this.msgBundle.getI18n("LANGUAGE_PAGE_ALT")}
                                        title={this.msgBundle.getI18n("LANGUAGE_PAGE_ALT")}
                                        onClick={this.toChangeLanguage.bind(this)}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public unMount(): void {
        const config = Configure.generateConfigure();
        config.removeTrigger("Horizontal_Navigation_Listener");
    }

    public componentWillUnmount(): void {
        this.unMount();
    }

    public componentDidMount(): void {
        const config = Configure.generateConfigure();
        config.addTrigger("Horizontal_Navigation_Listener", this.onNavigateTrigger.bind(this));
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

    private onNavigateTrigger(event: ITriggerData, sender?: any): void {
        ConsoleLog(`HorizontalNavigation: trigger change navigation - ${event.obj}`);

        if (typeof event.obj === "string") {
            this.switchNavigation(event.obj as string);
        } else if (typeof event.obj !== "object") {
            this.switchNavigation(this.defaultNavigation ?? "");
        }
    }

    private loadNavigationItem(): void {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const titleFile = require("./res/titledef.json");

        this.defaultNavigation = titleFile["default"];

        for (const item of titleFile["items"] || []) {
            const sText = this.msgBundle.getI18n(item["text"]);
            this.addItem(item["key"], <div className="navigation_horiz_default_oNavigationItemStyle">{sText}</div>);
        }
    }
}
