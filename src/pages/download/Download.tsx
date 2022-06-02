/**@format */

import React from "react";
import { DownloadMagnet, IBinaries, IBinarySource, IDMagnetItem } from "./DownloadMagnet";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "../common/TYDynamicPage";

import "./css/main.css";

export class DownLoad extends TYDynamicPage {
    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOWNLOAD_TITLE",
            remote: "project_download/downloadbrowser",
            key: "aitianyu_cn_download",
            cache: true,
            staticCache: false,
        });
    }

    protected renderLoaded(): React.ReactNode {
        const aProjects = this.renderProjects();

        return (
            <div className="download_base">
                <div className="download_baseGrid">
                    <div className="download_replace download_replace_1"></div>
                    <div className="download_content">{aProjects.length === 0 ? this.renderEmpty() : aProjects}</div>
                    <div className="download_replace download_replace_2"></div>
                </div>
            </div>
        );
    }

    private renderEmpty(): React.ReactNode {
        return (
            <div className="empty_download_outter">
                <div className="empty_download_inner">
                    <h1>{this.msgBundle.getI18n("NO_DOWNLOAD_PROJECT")}</h1>
                </div>
            </div>
        );
    }

    private renderProjects(): React.ReactNode[] {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const oProjectSource = this.getReceiveData();
        if (!Array.isArray(oProjectSource) || oProjectSource.length === 0) {
            return [];
        }

        const aProjectNodes: React.ReactNode[] = [];
        for (const project of oProjectSource) {
            aProjectNodes.push(this.renderProject(project));
        }

        return aProjectNodes;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private renderProject(oProject: any): React.ReactNode {
        const projectSource = this.createProjectSource(oProject);

        const oMagnet = new DownloadMagnet(projectSource);

        return oMagnet.render();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private createProjectSource(oProject: any): IDMagnetItem {
        const oPlatforms: IBinaries = {};
        for (const platformSource of oProject["binary"]) {
            const platform: string = platformSource["system"];

            const aBinaries: IBinarySource[] = [];
            const oBinariesSource = platformSource["binary"];
            for (const binarySource of Object.keys(oBinariesSource)) {
                const url = oBinariesSource[binarySource];

                let link = "";
                switch (url["address"]) {
                    case "inner":
                        link = `${process.env.PUBLIC_URL}/download/${url["url"]}`;
                        break;
                    case "web":
                    default:
                        link = url["url"];
                        break;
                }

                aBinaries.push({
                    name: binarySource,
                    url: link,
                });
            }
            oPlatforms[platform] = aBinaries;
        }

        const oMagnetSource: IDMagnetItem = {
            key: oProject["key"],
            name: oProject["name"],
            desc: oProject["description"],
            github: oProject["github"],
            bin: oPlatforms,
        };

        return oMagnetSource;
    }
}
