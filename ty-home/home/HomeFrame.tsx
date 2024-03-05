/**@format */

import React from "react";
import { IHomeAboutItem, IHomeFrameProperty } from "./HomeFrame.model";
import * as MessageBundle from "ty-home/i18n/MessageBundle";
import { Language, FeatureToggle, isMobile, Utils, Theme, ITianyuShell } from "@aitianyu.cn/tianyu-shell/core";
import { AITIANYU_CN_GENERIC_SERVER } from "ty-infra/server/remote-servers";
import { IReactState } from "ty-infra/ui/model/React";
import { IHomeNavigation } from "ty-infra/server/model/HomePage";
import { loadHomeNavigations } from "ty-infra/server/HomeNavigationLoader";

import "../css/home.main.css";
import "../css/footer.main.css";
import "../css/home.navi.css";

declare const tianyuShell: ITianyuShell;

export class HomeFrame extends React.Component<IHomeFrameProperty, IReactState> {
    private oSource: any;
    private isLoaded: boolean;
    private navigations: IHomeNavigation[];

    public constructor(props: IHomeFrameProperty) {
        super(props);

        this.oSource = {};
        this.isLoaded = false;
        this.navigations = [];

        document.title = MessageBundle.getText("HOME_PAGE_GLOBAL_TITLE");

        const cacheUrl = `${AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/home/navigation/${Language.toString()}`;

        const cachedData = tianyuShell.runtime.cache.storage.getValue(cacheUrl);
        if (cachedData) {
            try {
                this.navigations.push(...cachedData);
                this.isLoaded = true;
            } catch {
                this.navigations = [];
            }
        }
    }

    public componentDidMount(): void {
        if (this.isLoaded) {
            return;
        }

        (FeatureToggle.isActive("AITIANYU_CN_HOME_EXPLORER") ? loadHomeNavigations() : Promise.resolve([])).then(
            (results: IHomeNavigation[]) => {
                this.isLoaded = true;
                this.navigations = results;
                this.forceUpdate();
            },
        );
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const items = this.renderAboutItems();
        const navigationItems = this.renderNavigations();
        return (
            <div className="page_home_main_def_baseGrid">
                {this.renderHeader()}
                <div className="page_home_main_def_base_container">
                    {<section className="page_home_main_def_section_projects_summary">{items.length ? items : ""}</section>}
                    <section></section>
                    <div className="page_home_main_def_inner_container">
                        {navigationItems.length ? navigationItems : this.renderEmtpy()}
                    </div>
                </div>
                {!isMobile && (
                    <div className="page_home_main_def_footer">
                        <Footer />
                    </div>
                )}
            </div>
        );
    }

    private renderHeader(): React.ReactNode {
        const themeColor = Theme.getCustome()?.color || Theme.getDefault()?.color || "dark";
        const language = Utils.Processor.getCoreConfigure().environment !== "production" ? "default" : Language.toString();
        const homePageImg = require(`../../ty-infra/ui/res/home/logo/aitianyu.logo.${language}_${themeColor}.gif`).default;

        return (
            <div className="page_home_main_def_static">
                <div className="page_home_main_def_content">
                    <div className="page_home_main_def_home_start">
                        <img className="page_home_main_def_home_start_logo" alt="HOME_PAGE_TIANYU_LOGO_ALT" src={homePageImg} />
                    </div>
                    <div className="page_home_main_def_home_follow">
                        <div className="page_home_main_def_home_follow_desc">
                            {MessageBundle.getText("HOME_PAGE_HOME_FRAME_HOME_PAGE_DESCRIPTION")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderAboutItems(): React.ReactNode[] {
        const itemSources = this.createAboutItemSource();

        const items: React.ReactNode[] = [];
        for (const source of itemSources) {
            // items.push(new HomeAboutItem(source).render());
        }

        return items;
    }

    private renderNavigations(): React.ReactNode[] {
        if (isMobile) {
            return this.renderNavigationMob();
        }

        return this.renderNavigationNormal();
    }

    private renderNavigationNormal(): React.ReactNode[] {
        const items: React.ReactNode[] = [];
        for (const naviItem of this.navigations) {
            const fnOnClick = () => {
                if (naviItem.params.length) {
                    alert(MessageBundle.getText("HOME_PAGE_NAVIGATION_JUMP_NOT_SUPPORT"));
                    return;
                }

                window.location.href = `${window.location.protocol}//${window.location.host}${
                    naviItem.direct.startsWith("/") ? "" : "/"
                }${naviItem.direct}`;
            };
            items.push(
                <div onClick={fnOnClick} key={naviItem.page} className="homepage_navigation_container">
                    <div className="homepage_navigation_title homepage_navigation_text">{naviItem.text}</div>
                    <div className="homepage_navigation_desc homepage_navigation_text">{naviItem.desc}</div>
                </div>,
            );
        }

        return items;
    }

    private renderNavigationMob(): React.ReactNode[] {
        const items: React.ReactNode[] = [];
        for (const naviItem of this.navigations) {
            const fnOnClick = () => {
                if (naviItem.params.length) {
                    alert(MessageBundle.getText("HOME_PAGE_NAVIGATION_JUMP_NOT_SUPPORT"));
                    return;
                }

                window.location.href = `${window.location.protocol}//${window.location.host}${
                    naviItem.direct.startsWith("/") ? "" : "/"
                }${naviItem.direct}`;
            };
            items.push(
                <div onClick={fnOnClick} key={naviItem.page}>
                    <div>{naviItem.text}</div>
                    <div>{naviItem.desc}</div>
                </div>,
            );
        }

        return items;
    }

    private renderEmtpy(): React.ReactNode {
        return (
            <div style={{ color: "var(--ts_ui_blk_1)" }}>
                <div>{MessageBundle.getText("HOME_PAGE_HOME_FRAME_HOME_PAGE_SOURCE_EMPTY")}</div>
            </div>
        );
    }

    private createAboutItemSource(): IHomeAboutItem[] {
        const aAbouts = this.oSource["abouts"];
        if (!aAbouts) {
            return [];
        }

        const itemSources: IHomeAboutItem[] = [];
        for (const item of aAbouts) {
            itemSources.push({
                key: item["key"],
                title: item["title"],
                p1: item["p1"],
                p2: item["p2"],
            });
        }

        return itemSources;
    }
}

function Footer(): JSX.Element {
    return (
        <div id="Footer">
            <div className="footerContent_spile_line"></div>
            <div id="footerContent_empty_line"></div>
            <div id="footerContent_ContactToUs">
                {MessageBundle.getText("HOME_PAGE_HOME_FRAME_CONTACT_US")}&nbsp; &nbsp;
                <a href="mailto:dev.aitianyu.cn@outlook.com">{MessageBundle.getText("HOME_PAGE_HOME_FRAME_EMAIL_TEXT")}</a>&nbsp;
                {/* &amp;&nbsp; */}
                {/* <a href="tel:+8615685154601">{this.getI18nText("PHONE_TEXT")}</a>&nbsp; &nbsp; */}
                {MessageBundle.getText("HOME_PAGE_HOME_FRAME_LOOKING_FORWARD_CONTACT")}
            </div>
            <div id="footerContent_CR_ICP_DCP">
                {MessageBundle.getText("HOME_PAGE_HOME_FRAME_COPYRIGHT_TEXT")} © aitianyu.cn 2021-2024
            </div>
            <div id="footerContent_CR_ICP_DCP">
                <div>
                    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
                        黔ICP备2021004555号-1
                    </a>
                </div>
            </div>
            <div id="footerContent_CR_ICP_DCP">
                <div>
                    <a href="https://beian.mps.gov.cn/" target="_blank" rel="noreferrer">
                        贵公网安备52010202003856号
                    </a>
                </div>
            </div>
            <div id="footerContent_EndBeforeColorBalance"></div>
        </div>
    );
}
