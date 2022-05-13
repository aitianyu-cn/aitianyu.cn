/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/main.css";
import { DownloadMagnet, IBinaries, IBinarySource, IDMagnetItem } from "./DownloadMagnet";
import { MsgHelper } from "./MsgHelper";

/**
 * "projects": [
        {
            "key": "tianyu-native",
            "name": "PROJECT_NAME_TIANYU_NATIVE",
            "desc": "PROJECT_NAME_TIANYU_NATIVE_DESC",
            "github": "https://github.com/aitianyu-cn/tianyu-native",
            "repo": "https://github.com/aitianyu-cn/tianyu-native.git",
            "package": "https://github.com/aitianyu-cn/tianyu-native/archive/refs/heads/master.zip",
            "bin": [
                {
                    "system": "Windows",
                    "binary": {
                        "x64": "tianyu-native-win-x64.zip",
                        "ARM64": "tianyu-native-win-arm64.zip"
                    }
                },
                {
                    "system": "Linux",
                    "binary": {
                        "x64": "tianyu-native-linux-x64.zip",
                        "ARM64": "tianyu-native-linux-arm64.zip"
                    }
                },
                {
                    "system": "MacOS",
                    "binary": {
                        "Intel": "tianyu-native-mac-intel.zip",
                        "M1": "tianyu-native-linux-m1.zip"
                    }
                }
            ]
        }
    ]
 */

export class DownLoad extends React.Component<IShellProperty, IShellState> {
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
                <div className="download_empty_start"></div>
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
                aBinaries.push({
                    name: binarySource,
                    url: oBinariesSource[binarySource],
                });
            }
            oPlatforms[platform] = aBinaries;
        }

        const oMagnetSource: IDMagnetItem = {
            key: oProject["key"],
            name: oProject["name"],
            desc: oProject["desc"],
            github: oProject["github"],
            repo: oProject["repo"],
            package: oProject["package"],
            bin: oPlatforms,
        };

        return oMagnetSource;
    }
}
