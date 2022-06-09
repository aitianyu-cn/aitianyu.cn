/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/magnet.css";

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
    github: string;
}

export class DownloadMagnet extends TYViewComponent {
    private key: string;
    private name: string;
    private desc: string;
    private bin: IBinaries;
    private github: string;

    private hasDownload: boolean;

    public constructor(source: IDMagnetItem) {
        super({});

        this.key = source.key;
        this.name = source.name;
        this.desc = source.desc;
        this.bin = source.bin;
        this.github = source.github;

        this.hasDownload = Object.keys(this.bin).length !== 0;
    }

    public render(): React.ReactNode {
        const mobProjectLink = isMobile ? "magnet_tip_project_link_container_mob" : "magnet_tip_project_link_container";

        return (
            <div key={this.key} className="magnet_tip_main_container">
                <div className="magnet_tip_main_container_inner">
                    <div className={mobProjectLink}>
                        <div className="magnet_tip_project_name">
                            <a className="magnet_tip_project_link" href={this.github} target="_blank" rel="noopener noreferrer">
                                <div className="name_div">{this.msgBundle.getI18n(this.name) || this.name}</div>
                            </a>
                        </div>
                    </div>
                    <div className="magnet_tip_project_des">
                        <div className="description_div">{this.msgBundle.getI18n(this.desc) || this.desc}</div>
                    </div>
                    <div className="empty_line"></div>
                    <div className="download_magnet_section_container">
                        {this.hasDownload ? (
                            <div className="download_magnet_section_shell">{this.renderPlaforms()}</div>
                        ) : (
                            <div className="download_magnet_section_nodown">{this.msgBundle.getI18n("DOWNLOAD_INVALID")}</div>
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
                    <div className="download_magnet_section_title">{this.msgBundle.getI18n(platform)}</div>
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
}
