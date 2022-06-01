/**@format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { isMobile } from "react-device-detect";
import { Configure, ITriggerData } from "src/dty/core/Configure";
import { IParameters } from "src/dty/model/Interfaces";
import { IShellProperty } from "src/dty/model/IShell";
import {
    generateProjectSelectorDialog,
    insertButtonIntoProjectSelector,
    insertContentIntoProjectSelector,
} from "../common/ProjectSelectorDialog";
import { TYDynamicPage } from "../common/TYDynamicPage";

import "./css/docs.css";

interface ProjectItem {
    name: string;
    i18n: string;
    path: string;

    options: IParameters;
}

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

        return (
            <div className="docs_baseGrid_2">
                {this.renderProjects()}
                {this.renderProjectSelector()}
            </div>
        );
    }

    protected override loadDataSuccess(): void {
        if (Array.isArray(this.getReceiveData())) {
            this.processReceivedData([...this.getReceiveData()]);
        }
    }

    protected override componmentMounted(): void {
        const config = Configure.generateConfigure();
        config.addTrigger("Docs_Project_Selector_Trigger", this.onProjectItemSelected.bind(this));
    }

    protected override componmentWillUnmounted(): void {
        const config = Configure.generateConfigure();
        config.removeTrigger("Docs_Project_Selector_Trigger");
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

                item.options[key] = value;
            }

            this.aProjects.push(item);
        }
    }

    private renderEmptyProjects(): React.ReactNode {
        return <div className="docs_selector_no_project">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_NOT_AVAILABLE")}</div>;
    }

    private renderProjects(): React.ReactNode {
        return <div className="docs_title_base">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_TITLE")}</div>;
    }

    private renderProjectSelector(): React.ReactNode {
        const aProjectItemList: React.ReactNode[] = [];
        for (const project of this.aProjects) {
            const oDialog = generateProjectSelectorDialog();

            const optionKeys = Object.keys(project.options);
            if (optionKeys.length > 0) {
                insertContentIntoProjectSelector(oDialog, this.msgBundle.getI18n("TIANYU_DEV_DOCS_PROJECT_OPTIONS"));
                for (const optionKey of optionKeys) {
                    insertButtonIntoProjectSelector(
                        oDialog,
                        this.msgBundle.getI18n(optionKey),
                        "Docs_Project_Selector_Trigger",
                        `${project.options[optionKey]}::${project.path}`,
                    );
                }
            } else {
                insertContentIntoProjectSelector(oDialog, this.msgBundle.getI18n("TIANYU_DEV_DOCS_PROJECT_NO_OPTIONS"));
            }

            const fnClick = () => {
                const config = Configure.generateConfigure();
                config.trigger("Message_Dialog_Open", { obj: oDialog, msgBundle: this.msgBundle });
            };

            const projectItem = (
                <div
                    key={project.name}
                    onClick={fnClick}
                    className={isMobile ? "docs_selector_list_item_mob" : "docs_selector_list_item"}>
                    {project.i18n}
                </div>
            );

            aProjectItemList.push(projectItem);
        }

        return <div className={isMobile ? "docs_selector_list_base_mob" : "docs_selector_list_base"}>{aProjectItemList}</div>;
    }

    private static validateProjectItem(item: ProjectItem): boolean {
        return item.path.trim().length !== 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private onProjectItemSelected(event: ITriggerData, _sender?: any): void {
        const config = Configure.generateConfigure();
        config.trigger("Message_Dialog_Close", { obj: "" });

        const aEventStrings = ((event.obj as string) || "::").split("::");
        if (2 < aEventStrings.length) {
            return;
        }

        const locate = aEventStrings[0].trim();
        const project = aEventStrings[1].trim();

        if (locate.length === 0 || project.length === 0) {
            return;
        }

        window.location.href = `${window.location.href}/${locate}/${project}`;
    }
}
