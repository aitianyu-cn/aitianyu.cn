/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { ProjectItem } from "./interface/IProjectItem";
import { IParameters } from "src/dty/model/Interfaces";

import "../download/css/magnet.css";
import "./css/magnet.css";

export class DocsMagnet extends TYViewComponent {
    private name: string;
    private i18n: string;
    private path: string;
    private options: IParameters;

    private hasDocsOption: boolean;

    public constructor(source: ProjectItem) {
        super({});

        this.name = source.name;
        this.i18n = source.i18n;
        this.path = source.path;
        this.options = source.options;

        this.hasDocsOption = Object.keys(this.options).length !== 0;
    }

    public render(): React.ReactNode {
        const mobProjectLink = isMobile ? "magnet_tip_project_link_container_mob" : "magnet_tip_project_link_container";

        return (
            <div key={this.path} className="magnet_tip_main_container docs_magnet_tip_main_container">
                <div className="magnet_tip_main_container_inner docs_magnet_tip_main_container_inner">
                    <div className={mobProjectLink}>
                        <div className="magnet_tip_project_name">
                            <a className="magnet_tip_project_link" target="_blank" rel="noopener noreferrer">
                                <div className="name_div">{this.msgBundle.getI18n(this.i18n)}</div>
                            </a>
                        </div>
                    </div>
                    <div className="empty_line"></div>
                    <div className="docs_magnet_section_container">
                        {this.hasDocsOption ? (
                            <div className="docs_magnet_section_shell">{this.renderDownloads()}</div>
                        ) : (
                            <div className="docs_magnet_section_nodown">
                                {this.msgBundle.getI18n("TIANYU_DEV_DOCS_PROJECT_NO_OPTIONS")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    private renderDownloads(): React.ReactNode {
        const aOptions = Object.keys(this.options);
        if (!aOptions || aOptions.length === 0) {
            return [];
        }

        const aOptionNodes: React.ReactNode[] = [];
        const mobSectionLink = isMobile ? "docs_magnet_section_link_div_mob" : "docs_magnet_section_link_div";

        for (const option of aOptions) {
            const sPath = this.options[option];

            aOptionNodes.push(
                <a key={sPath} className="docs_magnet_section_link" href={`docs/${sPath}/${this.path}`}>
                    <div className={mobSectionLink}>
                        <div className="download_magnet_section_link_text">{this.msgBundle.getI18n(option)}</div>
                    </div>
                </a>,
            );
        }

        return <div className="docs_magnet_section_inner">{aOptionNodes}</div>;
    }
}
