/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { PageBase } from "../common/PageBase";

import "./css/main.css";
import { DownloadMagnet, IBinaries, IBinarySource, IDMagnetItem } from "./DownloadMagnet";
import { MsgHelper } from "./MsgHelper";

export class DownLoad extends PageBase {
    private msgHelper: MsgHelper;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgHelper = MsgHelper.generateHelper();
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const aProjects = this.renderProjects();

        return (
            <div className="download_base">
                <div className="download_search_container">
                    <div className="download_search_input_box_container">
                        <input className="download_search_input_box" />
                    </div>
                    <div className={isMobile ? "download_search_button_mob" : "download_search_button"}>
                        <div
                            className="download_search_button_text"
                            style={{ backgroundImage: `url("/assert/search-icon.png")` }}>
                            {/* <img src="/assert/search-icon.png" /> */}
                            {/* 搜索 */}
                        </div>
                    </div>
                </div>
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
                    <h1>{this.msgHelper.getI18nText("NO_DOWNLOAD_PROJECT")}</h1>
                </div>
            </div>
        );
    }

    private renderProjects(): React.ReactNode[] {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const oProjectSource = require("./res/projects.json");
        const aProjects = oProjectSource["projects"];
        if (!aProjects || aProjects.length === 0) {
            return [];
        }

        const aProjectNodes: React.ReactNode[] = [];
        for (const project of aProjects) {
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
        for (const platformSource of oProject["bin"]) {
            const platform: string = platformSource["system"];

            const aBinaries: IBinarySource[] = [];
            const oBinariesSource = platformSource["binary"];
            for (const binarySource of Object.keys(oBinariesSource)) {
                const url = oBinariesSource[binarySource];

                let link = "";
                switch (url["addr"]) {
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
            desc: oProject["desc"],
            bin: oPlatforms,
        };

        return oMagnetSource;
    }
}
