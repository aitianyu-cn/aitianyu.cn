/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IMsgBundle } from "src/dty/i18n/MsgBundle";
import { IMacrodefMember, INamespace, IProjectGlobal } from "../utils/Interfaces";

import "./view.base.css";
import "./view.api.project.css";
import "./view.api.datatype.member.css";

export function renderNamespace(projectName: string, projectGlobal: IProjectGlobal, msgBundle: IMsgBundle): React.ReactNode {
    return (
        <div className="docs_api_internal_container_base">
            <div className="docs_api_internal_container_title">{msgBundle.getI18n(projectName)}</div>
            <div className="docs_api_internal_container_content">
                <div className="docs_api_internal_container_content_2">
                    {projectGlobal.namespaces.length === 0 && projectGlobal.macros.length === 0 ? (
                        <div className="docs_api_internal_container_content_inner docs_api_internal_container_content_inner_project">
                            {renderEmptySpace(msgBundle)}
                        </div>
                    ) : (
                        <div className="docs_api_internal_container_content_inner docs_api_internal_container_content_inner_project">
                            {projectGlobal.namespaces.map((space: INamespace) => {
                                return renderNamespaceItem(space, msgBundle);
                            })}
                        </div>
                    )}
                    <div className="docs_api_internal_content_macrodef">
                        {renderMacrodefSection(projectGlobal.macros, msgBundle)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function renderNamespaceItem(space: INamespace, msgBundle: IMsgBundle): React.ReactNode {
    const onClick = () => {
        window.location.pathname = `${window.location.pathname}/${space.space}`;
    };

    return (
        <div
            key={space.space}
            className={isMobile ? "docs_api_internal_list_member_base_mob" : "docs_api_internal_list_member_base"}>
            <div className="docs_api_internal_list_member_inner" onClick={onClick}>
                {msgBundle.getI18n(space.space)}
            </div>
        </div>
    );
}

function renderEmptySpace(msgBundle: IMsgBundle): React.ReactNode {
    return <div className="docs_api_internal_empty">{msgBundle.getI18n("TIANYU_DEV_DOCS_API_PROJECT_NAMESPACE_EMPTY")}</div>;
}

function renderMacrodefSection(macros: IMacrodefMember[], msgBundle: IMsgBundle): React.ReactNode {
    if (macros.length === 0) {
        return <div></div>;
    }

    return (
        <div className="docs_api_internal_spacemember_section_base">
            <div className="docs_api_internal_container_title_item">
                <div className="docs_api_internal_container_title_item_sub">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_MACRO_DEF")}
                </div>
            </div>
            <div className="docs_api_internal_container_item_base">
                {macros.map((member: IMacrodefMember) => {
                    return renderMacrodefMember(member, msgBundle);
                })}
            </div>
        </div>
    );
}

function renderMacrodefMember(member: IMacrodefMember, msgBundle: IMsgBundle): React.ReactNode {
    return (
        <div key={member.macro} className="docs_api_internal_container_item_base_2">
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_body_title_mob">{member.macro}</div>
            </div>
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_title">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATATYPE_MEMBER_DISPLAY_NOTEKEY_FILE")}
                </div>
                <div className="docs_api_internal_container_item_pargraph_body">{member.file}</div>
            </div>
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_title">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_MACRO_DEF_VALUE_NOTEKEY")}
                </div>
                <div className="docs_api_internal_container_item_pargraph_body">{member.value}</div>
            </div>
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_title">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATATYPE_MEMBER_DISPLAY_NOTEKEY_NOTE")}
                </div>
                <div className="docs_api_internal_container_item_pargraph_body">{msgBundle.getI18n(member.macro)}</div>
            </div>
        </div>
    );
}
