/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/magnet.css";
import { MsgHelper } from "./MsgHelper";

export interface IBinarySource {
    name: string;
    url: string;
}

export interface IBinaries {
    [platform: string]: IBinarySource[];
}

export interface IDMagnetItem {
    key: string;
    name: string;
    github: string;
    bin: IBinaries;
}

export class DownloadMagnet extends React.Component<IShellProperty, IShellState> {
    private key: string;
    private name: string;
    private github: string;
    private bin: IBinaries;

    private hasDownload: boolean;

    private msgHelper: MsgHelper;

    public constructor(source: IDMagnetItem) {
        super({});

        this.key = source.key;
        this.name = source.name;
        this.github = source.github;
        this.bin = source.bin;

        this.msgHelper = MsgHelper.generateHelper();

        this.hasDownload = Object.keys(this.bin).length !== 0;
    }

    public render(): React.ReactNode {
        return (
            <div key={this.key} className="magnet_tip_main_container">
                <div className="magnet_tip_main_container_inner">
                    <div className="magnet_tip_project_link_container">
                        <div className="magnet_tip_project_name">
                            <a className="magnet_tip_project_link" href={this.github} target="_blank" rel="noopener noreferrer">
                                <div className="name_div">{this.msgHelper.getI18nText(this.name) || this.name}</div>
                            </a>
                        </div>
                        {/* <div className="magnet_tip_project_des">
                            <div className="description_div">{this.msgHelper.getI18nText(this.desc) || this.desc}</div>
                        </div> */}
                    </div>
                    <div className="empty_line"></div>
                    {/* <div className="magnet_tip_project_git_repo_container">
                        <div className="git_repo_empty_1"></div>
                        <div className="magnet_tip_project_git_repo_title">
                            {this.msgHelper.getI18nText("PROJECT_TITLE_GITHUB_REPO")}
                        </div>
                        <div className="magnet_tip_project_git_repo_git">
                            <div className="magnet_tip_project_git_repo_git_text">{this.github}</div>
                        </div>
                        <div className="magnet_tip_project_git_clone_title">
                            {this.msgHelper.getI18nText("PROJECT_TITLE_GITHUB_CLONE")}
                        </div>
                        <div className="magnet_tip_project_git_clone_git">git clone {this.repo}</div>
                        <div className="git_repo_empty_2"></div>
                    </div> */}
                    <div className="download_magnet_section_container">
                        {this.hasDownload ? (
                            <div className="download_magnet_section_shell">{this.renderPlaforms()}</div>
                        ) : (
                            <div className="download_magnet_section_nodown">{this.msgHelper.getI18nText("DOWNLOAD_INVALID")}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    private renderPlaforms(): React.ReactNode[] {
        const aReactNodes: React.ReactNode[] = [];
        const aPlatforms = Object.keys(this.bin);
        if (!aPlatforms || aPlatforms.length === 0) {
            return [];
        }

        for (const platform of aPlatforms) {
            const node = (
                <div key={platform} className="download_magnet_section_inner">
                    <div className="download_magnet_section_title">{this.msgHelper.getI18nText(platform)}</div>
                    <div>{this.renderDownloads(platform)}</div>
                </div>
            );

            aReactNodes.push(node);
        }

        return aReactNodes;
    }

    private renderDownloads(platform: string): React.ReactNode[] {
        const aDownloads = this.bin[platform];
        const aDownloadNodes: React.ReactNode[] = [];
        for (const download of aDownloads) {
            aDownloadNodes.push(
                <a
                    key={download.name}
                    className="download_magnet_section_link"
                    href={download.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="download_magnet_section_link_div">{download.name}</div>
                </a>,
            );
        }
        return aDownloadNodes;
    }
}
