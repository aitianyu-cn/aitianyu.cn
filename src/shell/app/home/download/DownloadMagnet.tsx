/**@format */

import React from "react";
import { IProjectDownloadProperty } from "tianyu-server/model/Project.model";
import { isMobile } from "ts-core/RuntimeHelper";
import { MagnetBase } from "../common/MagnetBase";

export class DownloadMagnet extends MagnetBase<IProjectDownloadProperty> {
    public constructor(source: IProjectDownloadProperty) {
        super(source);
    }

    protected renderOptions(): React.ReactNode[] {
        const aReactNodes: React.ReactNode[] = [];
        const aPlatforms = Object.keys(this.props.binary);
        if (!aPlatforms || aPlatforms.length === 0) {
            return [];
        }

        let width = "100%";
        if (aPlatforms.length > 1) {
            const percentage = 100 / aPlatforms.length;
            width = `${Math.round(percentage)}%`;
        }

        for (const platform of aPlatforms) {
            const node = (
                <div key={platform} className="download_magnet_section_inner" style={{ width: width }}>
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

        const mobSectionLink = isMobile ? "magnet_section_link_div_mob" : "magnet_section_link_div";
        for (const download of aDownloads.source) {
            aDownloadNodes.push(
                <a
                    key={download.name}
                    className="magnet_section_link"
                    href={download.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={mobSectionLink}>
                        <div className="magnet_section_link_text">{download.name}</div>
                    </div>
                </a>,
            );
        }
        return aDownloadNodes;
    }
}
