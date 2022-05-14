/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import { IBinaries, IBinarySource, IDownload, IProject, IProjectStyle } from "./Interfaces";

export class DataCenter {
    private _Languages: any;
    private _Projects: any;

    private constructor() {
        this._Languages = require("data/languages.json");
        this._Projects = require("data/projects.json");
    }

    public getSupportedLanguages(): string[]{
        return this._Languages["support"];
    }

    public getPendingLanguages(): string[]{
        return this._Languages["pending"];
    }

    public getProjects(): IProject[] {
        const projects: IProject[] = [];

        if (this._Projects ?. ["projects"]) {
            const projectSources = this._Projects["projects"];

            for (const projectSource of projectSources) {
                const projectStyle: IProjectStyle = {
                    color: "#646464",
                    fontColor:"#fff"
                };

                if (projectSource["style"]) {
                    projectStyle.color = projectSource["style"]["color"] || projectStyle.color;
                    projectStyle.fontColor = projectSource["style"]["fontColor"] || projectStyle.fontColor;
                }

                projects.push({
                    key:projectSource["key"],
                    name:projectSource["name"],
                    desc:projectSource["desc"],
                    github:projectSource["github"],
                    repo:projectSource["repo"],
                    style:projectStyle,
                })
            }
        }

        return projects;
    }

    public getDownloads(): IDownload[] {
        const downloads: IDownload[] = [];

        if (this._Projects ?. ["projects"]) {
            const projectSources = this._Projects["projects"];

            for (const projectSource of projectSources) {
                const binaries: IBinaries = {};

                if (projectSource["downloads"]) {
                    for (const downloadItem of projectSource["downloads"]) {
                        const binarySources: IBinarySource[] = [];

                        const platform = downloadItem["system"];
                        if (downloadItem["binary"]) {
                            for (const sName of Object.keys(downloadItem["binary"])) {
                                binarySources.push({
                                    name: sName,
                                    url: downloadItem["binary"][sName]
                                });
                            }
                        }

                        binaries[platform] = binarySources;
                    }
                }

                downloads.push({
                    key: projectSource["key"],
                    name: projectSource["name"],
                    github: projectSource["github"],
                    bin: binaries
                });
            }
        }


        return downloads;
    }

    public getProjectRaw(): any {
        return this._Projects;
    }

    private static _DataCenter: DataCenter | null = null;

    public static getData(): DataCenter {
        if (!DataCenter._DataCenter) {
            DataCenter._DataCenter = new DataCenter();
        }

        return DataCenter._DataCenter;
    }
}