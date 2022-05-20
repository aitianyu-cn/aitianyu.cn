/**@format */

import { IMsgBundle } from "src/dty/i18n/MsgBundle";
import { INamespaceContainer, INamespaceMember } from "../utils/Interfaces";
import { isMobile } from "react-device-detect";

import "./view.base.css";
import "./view.api.space.member.css";

export function renderNamespaceMembers(
    projectName: string,
    namespaceName: string,
    container: INamespaceContainer,
    msgBundle: IMsgBundle,
): React.ReactNode {
    const isNotEmpty =
        container.class.length ||
        container.enum.length ||
        container.function.length ||
        container.delegate.length ||
        container.interface.length ||
        container.struct.length ||
        container.property.length;

    return (
        <div className="docs_api_internal_container_base">
            <div className="docs_api_internal_container_title">{msgBundle.getI18n(projectName)}</div>
            <div className="docs_api_internal_container_content">
                <div className="docs_api_internal_container_title_sub">{msgBundle.getI18n(namespaceName)}</div>
                <div className="docs_api_internal_spacemember_container_content">
                    {isNotEmpty ? renderSections(container, msgBundle) : renderEmptySpace(msgBundle)}
                </div>
            </div>
        </div>
    );
}

function renderSections(container: INamespaceContainer, msgBundle: IMsgBundle): React.ReactNode {
    return (
        <div className="docs_api_internal_spacemember_container_content_inner">
            {renderSection(container.property, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_PROPERTY")}
            {renderSection(container.delegate, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_DELEGATE")}
            {renderSection(container.function, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_FUNCTION")}
            {renderSection(container.enum, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_ENUM")}
            {renderSection(container.struct, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_STRUCT")}
            {renderSection(container.interface, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_INTERFACE")}
            {renderSection(container.class, msgBundle, "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_CLASS")}
        </div>
    );
}

function renderSection(members: INamespaceMember[], msgBundle: IMsgBundle, type: string): React.ReactNode {
    if (members.length === 0) {
        return <div></div>;
    }

    const noClick =
        type === "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_PROPERTY" ||
        type === "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_DELEGATE" ||
        type === "TIANYU_DEV_DOCS_API_NAMESPACE_TYPE_FUNCTION";

    return (
        <div className="docs_api_internal_spacemember_section_base">
            <div className="docs_api_internal_container_title_item">
                <div className="docs_api_internal_container_title_item_sub">{msgBundle.getI18n(type)}</div>
            </div>
            <div className="docs_api_internal_container_item_base">
                {members.map((member: INamespaceMember) => {
                    return renderSectionMember(member, msgBundle, !noClick);
                })}
            </div>
        </div>
    );
}

function renderSectionMember(member: INamespaceMember, msgBundle: IMsgBundle, hasClick = true): React.ReactNode {
    const onClick = () => {
        if (!hasClick) {
            return;
        }
        window.location.pathname = `${window.location.pathname}/${member.name}`;
    };

    return (
        <div key={member.i18n} className="docs_api_internal_container_item_base_2">
            <div className="docs_api_internal_container_item_pargraph">
                <div
                    className={
                        isMobile || !hasClick
                            ? "docs_api_internal_container_item_pargraph_body_title_mob"
                            : "docs_api_internal_container_item_pargraph_body_title"
                    }
                    onClick={onClick}>
                    {member.name}
                </div>
            </div>
            <div className="docs_api_internal_container_item_pargraph">
                <div className="docs_api_internal_container_item_pargraph_title">
                    {msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATATYPE_MEMBER_DISPLAY_NOTEKEY_FILE")}
                </div>
                <div className="docs_api_internal_container_item_pargraph_body">{member.file}</div>
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
            {msgBundle.getI18n("TIANYU_DEV_DOCS_API_PROJECT_DATATYPES_EMPTY")}
        </div>
    );
}
