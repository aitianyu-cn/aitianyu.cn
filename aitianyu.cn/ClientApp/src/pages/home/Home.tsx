/**@format */

import React from "react";
import { Footer } from "../../app/footer/Footer";
import { isMobile } from "react-device-detect";

import "./css/home.main.css";
import { IShellProperty } from "src/dty/model/IShell";
import { HomeAboutItem, IHomeAboutItem } from "./HomeAboutItem";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

export class Home extends TYViewComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private oSource: any;

    public constructor(props: IShellProperty) {
        super(props);

        this.oSource = {};

        document.title = "个人编程学习";
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const items = this.renderAboutItems();
        return (
            <div className="page_home_main_def_baseGrid">
                {this.renderHeader()}
                <div className="page_home_main_def_base_container">
                    {/* {items.length && isMobile && <p>{this.msgBundle.getI18nText("HOME_PAGE_MOB_ABOUT_TIANYU")}</p>} */}
                    {<section className="page_home_main_def_section_projects_summary">{items.length ? items : ""}</section>}
                    <section></section>
                    <div className="page_home_main_def_inner_container">{this.renderEmtpy()}</div>
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
        return (
            <div className="page_home_main_def_static">
                <div className="page_home_main_def_content">
                    <div className="page_home_main_def_home_start">
                        <img
                            className="page_home_main_def_home_start_logo"
                            alt={this.msgBundle.getI18n("HOME_PAGE_TIANYU_LOGO_ALT")}
                            src={this.msgBundle.getI18n("HOME_PAGE_TIANYU")}
                        />
                    </div>
                    <div className="page_home_main_def_home_follow">
                        <div className="page_home_main_def_home_follow_desc">
                            {this.msgBundle.getI18n("HOME_PAGE_DESCRIPTION")}
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
            items.push(new HomeAboutItem(source).render());
        }

        return items;
    }

    private renderEmtpy(): React.ReactNode {
        return (
            <div>
                <div>{this.msgBundle.getI18n("HOME_PAGE_SOURCE_EMPTY")}</div>
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
