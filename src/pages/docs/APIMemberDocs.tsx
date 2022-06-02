/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { APIMemberPage } from "./APIMemberPage";

import "./css/docs.api.members.css";

function getAPIDocsDisplayType(): string[] {
    const path = window.location.pathname.substring(10);
    const aPaths: string[] = [];

    for (const pathItem of path.split("/")) {
        pathItem && aPaths.push(pathItem);
    }

    return aPaths;
}

export class APIMemberDocs extends TYViewComponent {
    private project: string;
    private packageName: string;

    private isMemberSelected: boolean;
    private selectedMember: string;

    private memberList: string[];

    public constructor(props: IShellProperty) {
        super(props);

        const aPaths = getAPIDocsDisplayType();
        this.project = aPaths[0];
        this.packageName = aPaths[1];

        this.memberList = [];

        if (props["members"] && Array.isArray(props["members"])) {
            this.memberList.push(...props["members"]);
        }

        this.isMemberSelected = false;
        this.selectedMember = "";
    }

    public render(): React.ReactNode {
        return (
            <div className="docs_api_member_base">
                <div className="docs_api_title_base">
                    <div className="docs_api_title_project_name">{`${this.msgBundle.getI18n(
                        this.project,
                    )} - ${this.msgBundle.getI18n(this.packageName)}`}</div>
                </div>
                {this.renderNormal()}
            </div>
        );
    }

    public componentDidMount(): void {
        const hash = window.location.hash.replaceAll("#", "");
        if (this.memberList.includes(hash)) {
            this.onMemberSelected(hash);
        }
    }

    private renderNormal(): React.ReactNode {
        return (
            <div className="docs_api_member_content_base">
                <div className="docs_api_member_content_member_list">{this.renderMemberList()}</div>
                {this.isMemberSelected ? (
                    <div className="docs_api_member_content_member_view">
                        <APIMemberPage />
                    </div>
                ) : (
                    this.renderMemberNoSelect()
                )}
            </div>
        );
    }

    private renderMemberNoSelect(): React.ReactNode {
        return <div></div>;
    }

    private renderMemberList(): React.ReactNode[] {
        const memberList: React.ReactNode[] = [];

        for (const member of this.memberList) {
            const fnClick = () => {
                this.onMemberSelected(member);
            };

            const memberItem = (
                <div
                    id={`docs_api_member_content_member_list_item_${member}`}
                    key={member}
                    onClick={fnClick}
                    className={
                        isMobile ? "docs_api_member_content_member_list_item_mob" : "docs_api_member_content_member_list_item"
                    }>
                    {member}
                </div>
            );
            memberList.push(memberItem);
        }

        return memberList;
    }

    private onMemberSelected(memberName: string): void {
        if (this.isMemberSelected && this.selectedMember === memberName) {
            return;
        }

        if (this.selectedMember) {
            // reset style
            const element = document.getElementById(`docs_api_member_content_member_list_item_${this.selectedMember}`);
            if (element) {
                element.classList.remove("docs_api_member_content_member_list_item_selected");
            }
        }

        // set style
        const element = document.getElementById(`docs_api_member_content_member_list_item_${memberName}`);
        if (element) {
            element.classList.add("docs_api_member_content_member_list_item_selected");
        }

        this.selectedMember = memberName;
        this.isMemberSelected = true;

        window.location.hash = `#${memberName}`;

        this.forceUpdate();
    }
}
