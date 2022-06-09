/**@format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { isMobile } from "react-device-detect";
import { FeatureToggle } from "src/dty/core/FeatureToggle";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "../common/TYDynamicPage";
import { ProjectItem } from "./interface/IProjectItem";
import { DocsMagnet } from "./DocsMagnet";

import "./css/docs.css";

export class Docs extends TYDynamicPage {
    private aProjects: ProjectItem[];

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_TITLE",
            remote: "global/projectbrowser",
            key: "aitianyu_cn_docs",
            cache: true,
            staticCache: false,
        });

        this.aProjects = [];
    }

    protected override renderLoaded(): React.ReactNode {
        const isEmpty = this.aProjects.length === 0;

        if (isEmpty) {
            return <div className="docs_baseGrid">{this.renderEmptyProjects()}</div>;
        }

        return <div className="docs_baseGrid">{this.renderLocalProjectSelector()}</div>;
    }

    protected override loadDataSuccess(): void {
        if (Array.isArray(this.getReceiveData())) {
            this.processReceivedData([...this.getReceiveData()]);
        }
    }

    protected override componmentMounted(): void {
        //
    }

    protected override componmentWillUnmounted(): void {
        //
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private processReceivedData(aProjects: any[]): void {
        for (const project of aProjects) {
            const item: ProjectItem = {
                name: project["name"] || "",
                i18n: this.msgBundle.getI18n(project["i18n"] || ""),
                path: project["path"] || "",
                options: {},
            };

            if (!Docs.validateProjectItem(item)) {
                continue;
            }

            const options = project["options"] || [];
            for (const option of options) {
                const key: string = option["key"] || "";
                const value: string = option["value"] || "";

                if (key.length === 0 || value.length === 0) {
                    continue;
                }

                const featureName = `AITIANYU_CN_WEB_DOCS_OPTIONS_${value.toUpperCase()}_ENABLE`;
                if (FeatureToggle.isActive(featureName)) {
                    item.options[key] = value;
                }
            }

            this.aProjects.push(item);
        }
    }

    private renderEmptyProjects(): React.ReactNode {
        return <div className="docs_selector_no_project">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_NOT_AVAILABLE")}</div>;
    }

    private renderLocalProjectSelector(): React.ReactNode {
        const aProjects: React.ReactNode[] = [];

        for (const project of this.aProjects) {
            const oMagnet = new DocsMagnet(project);

            aProjects.push(oMagnet.render());
        }

        return <div className={isMobile ? "docs_selector_list_base_mob" : "docs_selector_list_base"}>{aProjects}</div>;
    }

    private static validateProjectItem(item: ProjectItem): boolean {
        return item.path.trim().length !== 0;
    }
}
