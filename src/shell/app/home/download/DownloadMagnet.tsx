/**@format */

import React from "react";
import { IProjectDownload } from "tianyu-server/model/Project.model";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";

import "./css/magnet.css";

export class DownloadMagnet extends React.Component<IProjectDownload> {
    private isLoaded: boolean;

    public constructor(source: IProjectDownload) {
        super(source);

        this.isLoaded = false;
    }

    public override render(): React.ReactNode {
        const messageBundle = require_msgbundle("home", "app");
        const mobProjectLink = isMobile() ? "magnet_tip_project_link_container_mob" : "magnet_tip_project_link_container";

        return (
            <div key={this.props.key} className="magnet_tip_main_container">
                <div className="magnet_tip_main_container_inner">
                    <div className={mobProjectLink}>
                        <div className="magnet_tip_project_name">
                            <a
                                className="magnet_tip_project_link"
                                href={this.props.github}
                                target="_blank"
                                rel="noopener noreferrer">
                                <div className="name_div">{this.props.name}</div>
                            </a>
                        </div>
                    </div>
                    <div className="magnet_tip_project_des">
                        <div className="description_div">{this.props.desc}</div>
                    </div>
                    <div className="empty_line"></div>
                    <div className="download_magnet_section_container">
                        {Object.keys(this.props.binary).length > 0 ? (
                            <div className="download_magnet_section_shell">{this.renderPlaforms()}</div>
                        ) : (
                            <div className="download_magnet_section_nodown">
                                {messageBundle.getText("HOME_PAGE_DOWNLOAD_FRAME_DOWNLOAD_INVALID")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    private renderPlaforms(): React.ReactNode[] {
        const aReactNodes: React.ReactNode[] = [];
        const aPlatforms = Object.keys(this.props.binary);
        if (!aPlatforms || aPlatforms.length === 0) {
            return [];
        }

        for (const platform of aPlatforms) {
            const node = (
                <div key={platform} className="download_magnet_section_inner">
                    <div className="download_magnet_section_title">{platform}</div>
                    <div className="download_magnet_section_links">{this.renderDownloads(platform)}</div>
                </div>
            );

            aReactNodes.push(node);
        }

        return aReactNodes;
    }

    private renderDownloads(platform: string): React.ReactNode[] {
        const aDownloads = this.props.binary[platform];
        const aDownloadNodes: React.ReactNode[] = [];

        const mobSectionLink = isMobile() ? "download_magnet_section_link_div_mob" : "download_magnet_section_link_div";
        for (const download of aDownloads.source) {
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
