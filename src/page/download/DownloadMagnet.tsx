/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { Configure } from "../../dty/common/core/Configure";
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
    desc: string;
    bin: IBinaries;
}

export class DownloadMagnet extends React.Component<IShellProperty, IShellState> {
    private key: string;
    private name: string;
    private desc: string;
    private bin: IBinaries;

    private hasDownload: boolean;

    private msgHelper: MsgHelper;

    public constructor(source: IDMagnetItem) {
        super({});

        this.key = source.key;
        this.name = source.name;
        this.desc = source.desc;
        this.bin = source.bin;

        this.msgHelper = MsgHelper.generateHelper();

        this.hasDownload = Object.keys(this.bin).length !== 0;
    }

    public render(): React.ReactNode {
        const navigateLink = `/docs/api/${this.key}`;
        const mobProjectLink = isMobile ? "magnet_tip_project_link_container_mob" : "magnet_tip_project_link_container";

        return (
            <div key={this.key} className="magnet_tip_main_container">
                <div className="magnet_tip_main_container_inner">
                    <div className={mobProjectLink}>
                        <div className="magnet_tip_project_name">
                            <Link
                                className="magnet_tip_project_link"
                                to={navigateLink}
                                onClick={this.triggerNavigation.bind(this)}>
                                <div className="name_div">{this.msgHelper.getI18nText(this.name) || this.name}</div>
                            </Link>
                        </div>
                    </div>
                    <div className="magnet_tip_project_des">
                        <div className="description_div">{this.msgHelper.getI18nText(this.desc) || this.desc}</div>
                    </div>
                    <div className="empty_line"></div>
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
                    <div className="download_magnet_section_links">{this.renderDownloads(platform)}</div>
                </div>
            );

            aReactNodes.push(node);
        }

        return aReactNodes;
    }

    private renderDownloads(platform: string): React.ReactNode[] {
        const aDownloads = this.bin[platform];
        const aDownloadNodes: React.ReactNode[] = [];

        const mobSectionLink = isMobile ? "download_magnet_section_link_div_mob" : "download_magnet_section_link_div";
        for (const download of aDownloads) {
            aDownloadNodes.push(
                <a
                    key={download.name}
                    className="download_magnet_section_link"
                    href={download.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={mobSectionLink}>
                        <div className="download_magnet_section_link_text">{download.name}</div>
                    </div>
                </a>,
            );
        }
        return aDownloadNodes;
    }

    private triggerNavigation(): void {
        const config = Configure.generateConfigure();
        config.trigger("horizontal_navigation", { obj: "project" }, this);
    }
}
