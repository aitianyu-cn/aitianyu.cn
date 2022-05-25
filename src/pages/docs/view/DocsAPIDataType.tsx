/**@format */

import React from "react";
import { IMsgBundle } from "src/dty/i18n/MsgBundle";
import { IDataTypeContainer, IDataTypeMember } from "../utils/Interfaces";

import "./view.base.css";
import "./view.api.space.member.css";
import "./view.api.datatype.member.css";

export function renderDataTypeMembers(
    projectName: string,
    namespaceName: string,
    datatype: string,
    container: IDataTypeContainer,
    msgBundle: IMsgBundle,
): React.ReactNode {
    const isNotEmpty =
        container.method.length ||
        container.operator.length ||
        container.construct.length ||
        container.enum.length ||
        container.property.length;

    const isEnum = container.enum.length;

    return (
        <div className="docs_api_internal_container_base">
            <div className="docs_api_internal_container_title">{msgBundle.getI18n(projectName)}</div>
            <div className="docs_api_internal_datatype_container_content">
                <div className="docs_api_internal_datatype_container_title_sub">{msgBundle.getI18n(namespaceName)}</div>
                <div className="docs_api_internal_datatype_container_content">
                    <div className="docs_api_internal_datatype_container_title_sub">{msgBundle.getI18n(datatype)}</div>
                    <div className="docs_api_internal_datatype_container_content_inner">
                        {isNotEmpty
                            ? isEnum
                                ? renderSection(container.enum, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_ENUM")
                                : renderSections(container, msgBundle)
                            : renderEmptySpace(msgBundle)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function renderSections(container: IDataTypeContainer, msgBundle: IMsgBundle): React.ReactNode {
    return (
        <div className="docs_api_internal_spacemember_container_content_inner">
            {renderSection(container.construct, msgBundle, "TIANYU_DEV_DOCS_API_DATATYPE_TYPE_CONSTRUCTOR")}
            {renderSection(container.property, msgBundle, "TIANYU_DEV_DOCS_API_DATATYPE_TYPE_PROPERTY")}
            {renderSection(container.method, msgBundle, "TIANYU_DEV_DOCS_API_DATATYPE_TYPE_METHOD")}
            {renderSection(container.operator, msgBundle, "TIANYU_DEV_DOCS_API_DATATYPE_TYPE_OPERATOR")}
        </div>
    );
}

function renderSection(members: IDataTypeMember[], msgBundle: IMsgBundle, type: string): React.ReactNode {
    if (members.length === 0) {
        return <div></div>;
    }

    return (
        <div className="docs_api_internal_spacemember_section_base">
            <div className="docs_api_internal_container_title_item">
                <div className="docs_api_internal_container_title_item_sub">{msgBundle.getI18n(type)}</div>
            </div>
            <div className="docs_api_internal_container_item_base">
                {members.map((member: IDataTypeMember) => {
                    return renderSectionMember(member, msgBundle);
                })}
            </div>
        </div>
    );
}

function renderSectionMember(member: IDataTypeMember, msgBundle: IMsgBundle): React.ReactNode {
    return (
        <div key={member.i18n} className="docs_api_internal_container_item_base_2">
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_body_title_mob">{member.name}</div>
            </div>
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_title">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATATYPE_MEMBER_DISPLAY_NOTEKEY_DEF")}
                </div>
                <div className="docs_api_internal_container_item_pargraph_body">{member.def}</div>
            </div>
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_title">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATATYPE_MEMBER_DISPLAY_NOTEKEY_NOTE")}
                </div>
                <div className="docs_api_internal_container_item_pargraph_body">{member.i18n}</div>
            </div>
        </div>
    );
}

function renderEmptySpace(msgBundle: IMsgBundle): React.ReactNode {
    return (
        <div className="docs_api_internal_empty docs_api_internal_spacemember_empty">
            {msgBundle.getI18n("TIANYU_DEV_DOCS_API_PROJECT_DATATYPE_EMPTY")}
        </div>
    );
}
