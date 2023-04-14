/**@format */

import React from "react";
import { IMagnetPropertyBase, IProjectDocumentOption } from "tianyu-server/model/Project.model";
import { FeatureToggle } from "ts-core/FeatureToggle";
import { isMobile } from "ts-core/RuntimeHelper";
import { MagnetBase } from "../../common/MagnetBase";

export interface IDocumentMagnetProperty extends IMagnetPropertyBase {
    options: IProjectDocumentOption[];
}

export class DocumentMagnet extends MagnetBase<IDocumentMagnetProperty> {
    public constructor(props: IDocumentMagnetProperty) {
        super(props);
    }

    protected override renderOptions(): React.ReactNode[] {
        if (this.props.options.length === 0) {
            return [];
        }

        const aOptionNodes: React.ReactNode[] = [];
        const mobSectionLink = isMobile ? "magnet_section_link_div_mob" : "magnet_section_link_div";
        const isDocumentSupported = FeatureToggle.isActive("AITIANYU_CN_WEB_DOCUMENT_SUPPORT");

        let width = "100%";
        if (this.props.options.length > 1 && this.props.options.length <= 4) {
            const percentage = 100 / this.props.options.length;
            width = `${Math.round(percentage)}%`;
        } else {
            width = "33.3%";
        }

        for (const option of this.props.options) {
            const link = isDocumentSupported ? `/#docs/${option.target}?project=${this.props.id}` : "/#docs";
            aOptionNodes.push(
                <a key={option.name} className="magnet_section_link" href={link} style={{ width: width }}>
                    <div className={mobSectionLink}>
                        <div className="magnet_section_link_text">{option.name}</div>
                    </div>
                </a>,
            );
        }

        return aOptionNodes;
    }
}
