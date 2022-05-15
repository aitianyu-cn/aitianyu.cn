/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { Footer } from "../../app/footer/Footer";

import "./css/home.main.css";
import { PageBase } from "../common/PageBase";
import { HomeItem } from "./HomeItem";
import { IProject, IProjectStyle } from "../../dty/model/Interfaces";
import { isMobile } from "react-device-detect";

export class Home extends PageBase {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const items = this.renderItems();
        return (
            <div className="page_home_main_def_baseGrid">
                <div className="page_home_main_def_content">
                    <div className="page_home_main_def_base_container">
                        <div className="page_home_main_def_inner_container">
                            {items.length ? items : this.renderEmtpy()}
                            {/* <div className="page_home_main_def_player_bottom"></div> */}
                        </div>
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

    private renderItems(): React.ReactNode[] {
        const itemSources = this.createItemSource();

        const items: React.ReactNode[] = [];
        for (const source of itemSources) {
            items.push(new HomeItem(source).render());
        }

        return items;
    }

    private renderEmtpy(): React.ReactNode {
        return (
            <div>
                <div>当前没有项目</div>
            </div>
        );
    }

    private createItemSource(): IProject[] {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const oProject = require("./res/projects.json");
        const aProjects = oProject["projects"];
        if (!aProjects) {
            return [];
        }

        const itemSources: IProject[] = [];
        for (const item of aProjects) {
            const style: IProjectStyle = {
                color: "#646464",
                fontColor: "#fff",
            };

            if (item["style"]) {
                const styleSource = item["style"];
                style.color = styleSource["color"] || style.color;
                style.fontColor = styleSource["fontColor"] || style.fontColor;
            }

            itemSources.push({
                key: item["key"],
                name: item["name"],
                desc: item["desc"],
                github: item["github"],
                repo: item["repo"],
                style: style,
            });
        }

        return itemSources;
    }
}
