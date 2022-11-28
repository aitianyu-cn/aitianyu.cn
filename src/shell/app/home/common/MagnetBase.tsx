/**@format */

import React from "react";
import { IMagnetPropertyBase } from "tianyu-server/model/Project.model";
import { isMobile } from "ts-core/RuntimeHelper";

export abstract class MagnetBase<T extends IMagnetPropertyBase> extends React.Component<T> {
    protected isLoaded: boolean;

    public constructor(source: T) {
        super(source);

        this.isLoaded = false;
    }

    public override render(): React.ReactNode {
        const mobProjectLink = isMobile ? "magnet_tip_project_link_container_mob" : "magnet_tip_project_link_container";

        const options = this.renderOptions();

        return (
            <div key={this.props.id} className="magnet_tip_main_container">
                <div className="magnet_tip_main_container_inner">
                    <div className={mobProjectLink}>
                        <div className="magnet_tip_project_name">
                            {!!this.props.github ? (
                                <a
                                    className="magnet_tip_project_link"
                                    href={this.props.github}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="name_div">{this.props.name}</div>
                                </a>
                            ) : (
                                <a className="magnet_tip_project_link">
                                    <div className="name_div">{this.props.name}</div>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="magnet_tip_project_des">
                        <div className="description_div">{this.props.desc}</div>
                    </div>
                    <div className="empty_line"></div>
                    <div className="magnet_section_container">
                        {options.length > 0 ? (
                            <div className="magnet_section_shell">{options}</div>
                        ) : (
                            <div className="magnet_section_nodown">{this.props.optionEmptyText}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    protected abstract renderOptions(): React.ReactNode[];
}
