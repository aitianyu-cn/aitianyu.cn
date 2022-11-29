/**@format */

import React from "react";
import { FeatureToggle } from "ts-core/FeatureToggle";
import { isMobile } from "ts-core/RuntimeHelper";
import { MapOfString } from "ts-core/Types";

export interface IDocumentSimpleMagnetProperty {
    project: string;
    name: string;
    id: string;
    desc: string;
    type: string;

    hasHelp: boolean;
    helpText: string;
}

const _urlTypeMap: MapOfString = {
    "node-modules": "https://www.npmjs.com/package/",
};

function _generateUrlByType(type: string, id: string): string {
    const url = _urlTypeMap[type];
    if (!!!url) return "";

    const targetUrl = url + id;
    return targetUrl;
}

export class DocumentSimpleMagnet extends React.Component<IDocumentSimpleMagnetProperty, IReactState> {
    public constructor(props: IDocumentSimpleMagnetProperty) {
        super(props);
    }

    public override render(): React.ReactNode {
        const mobProjectLink = isMobile
            ? "simple_magnet_tip_project_link_container_mob"
            : "simple_magnet_tip_project_link_container";

        const url = _generateUrlByType(this.props.type, this.props.id);
        const options = this.renderOptions();

        return (
            <div key={this.props.id} className="magnet_tip_main_container" style={{ display: "flex" }}>
                <div className={mobProjectLink} style={{ borderRadius: "5px", borderWidth: "0" }}>
                    <div className="simple_magnet_tip_project_name">
                        {!!url ? (
                            <a className="magnet_tip_project_link" href={url} target="_blank" rel="noopener noreferrer">
                                <div className="simple_name_div">{this.props.name}</div>
                                <div className="description_div" style={{ marginTop: "5px", marginBottom: "15px" }}>
                                    {this.props.desc}
                                </div>
                            </a>
                        ) : (
                            <a className="magnet_tip_project_link">
                                <div className="simple_name_div">{this.props.name}</div>
                                <div className="description_div" style={{ marginTop: "5px", marginBottom: "15px" }}>
                                    {this.props.desc}
                                </div>
                            </a>
                        )}
                    </div>
                </div>
                <div className="simple_magnet_section_container" style={{ width: "max-content", height: "100%" }}>
                    {!!options && (
                        <div className="magnet_section_shell" style={{ width: "max-content", height: "100%" }}>
                            {options}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private renderOptions(): React.ReactNode | null {
        if (!!!this.props.hasHelp) {
            return null;
        }

        const isDocumentSupported = FeatureToggle.isActive("AITIANYU_CN_WEB_DOCUMENT_SUPPORT");
        const link = isDocumentSupported ? `/#docs/help?project=${this.props.id}` : "/#docs";
        const mobSectionLink = isMobile ? "magnet_section_link_div_mob" : "magnet_section_link_div";
        return (
            <div style={{ width: "100px", height: "100px" }}>
                <a className="magnet_section_link" href={link} style={{ width: "max-content" }}>
                    <div className={mobSectionLink} style={{ height: "80%" }}>
                        <div className="magnet_section_link_text">{this.props.helpText}</div>
                    </div>
                </a>
            </div>
        );
    }
}
