/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { DownloadMagnet, IBinaries, IBinarySource, IDMagnetItem } from "./DownloadMagnet";
import { SearchNotSupportDialog } from "./DownloadSearchDialog";
import { IShellProperty } from "src/dty/model/IShell";
import { Configure } from "src/dty/core/Configure";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/main.css";

/**
 * 
                {
                    "system": "WINDOWS",
                    "binary": {
                        "x64": {
                            "addr": "inner",
                            "url": "tianyu-native/tianyu-native-win-x64.zip"
                        },
                        "ARM64": {
                            "addr": "inner",
                            "url": "tianyu-native/tianyu-native-win-arm64.zip"
                        }
                    }
                },
                {
                    "system": "LINUX",
                    "binary": {
                        "x64": {
                            "addr": "inner",
                            "url": "tianyu-native/tianyu-native-linux-x64.zip"
                        },
                        "ARM64": {
                            "addr": "inner",
                            "url": "tianyu-native/tianyu-native-linux-arm64.zip"
                        }
                    }
                },
                {
                    "system": "MACOS",
                    "binary": {
                        "Intel": {
                            "addr": "inner",
                            "url": "tianyu-native/tianyu-native-mac-intel.zip"
                        },
                        "M1": {
                            "addr": "inner",
                            "url": "tianyu-native/tianyu-native-linux-m1.zip"
                        }
                    }
                }
 */

export class DownLoad extends TYViewComponent {
    public constructor(props: IShellProperty) {
        super(props);

        document.title = this.msgBundle.getI18n("PROJECT_DOWNLOAD_TITLE");
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
                        <input id="search_input_box" className="download_search_input_box" type="text" />
                    </div>
                    <div
                        className={isMobile ? "download_search_button_mob" : "download_search_button"}
                        onClick={this.onSearch.bind(this)}>
                        <div
                            className="download_search_button_text"
                            style={{ backgroundImage: `url("/assert/search-icon.png")` }}></div>
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

    private onSearch(): void {
        const config = Configure.generateConfigure();
        config.trigger("Message_Dialog_Open", { msgBundle: this.msgBundle, obj: SearchNotSupportDialog });
        return;

        // const searchBox = document.getElementById("search_input_box") as HTMLInputElement;
        // const searchValue = searchBox?.value || "";

        // if (!searchValue) {
        //     const config = Configure.generateConfigure();
        //     config.trigger("global_message_dialog_open", { msgBundle: this.msgHelper, obj: SearchEmptyDialog });
        //     return;
        // }

        // const jumpUrl = `${location.origin}/search?wd=${searchValue}#download`;
        // location.href = jumpUrl;

        // window.open(jumpUrl);
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