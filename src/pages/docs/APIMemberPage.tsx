/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { DynamicInvalidTargetState, TYDynamicPage } from "../common/TYDynamicPage";
import { getAPIMemberDocsRemote } from "./APIDocsHelper";
import { INamespaceMember, INamespaceMemberDef, INamespaceMemberItem } from "./interface/INamespaceMemberItem";

import "./css/docs.api.members.css";
import "./css/docs.api.members.base.css";

export class APIMemberPage extends TYDynamicPage {
    private preHashChanged: ((ev: HashChangeEvent) => void) | null;

    private memberItem: INamespaceMember;

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_API_TITLE",
            key: `aitianyu_cn_docs_api_members`,
            id: getAPIMemberDocsRemote(),
            remote: `project_docs/apibrowser`,
            cache: true,
            staticCache: false,
        });

        this.preHashChanged = null;
        this.memberItem = {
            name: "",
            type: "",
            memberDefs: [],
            memberItems: {
                constructor: [],
                property: [],
                operator: [],
                method: [],
            },
        };
    }

    protected override componmentMounted(): void {
        this.preHashChanged = window.onhashchange;
        window.onhashchange = this.onHashChanged.bind(this);
    }

    protected override componmentWillUnmounted(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
        window.onhashchange = this.preHashChanged;
    }

    protected override renderLoaded(): React.ReactNode {
        return (
            <div className="docs_api_members_base_root">
                {this.renderTitle()}
                {this.renderDefine()}
                {this.memberItem.memberItems.constructor.length ? (
                    <div>
                        <div>{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_CONSTRUCTOR")}</div>
                        <div>{this.renderMemberItem(this.memberItem.memberItems.constructor, true)}</div>
                    </div>
                ) : (
                    <div></div>
                )}
                {this.memberItem.memberItems.property.length ? (
                    <div>
                        <div>{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_PROPERTY")}</div>
                        <div>{this.renderMemberItem(this.memberItem.memberItems.property, this.memberItem.type != "enum")}</div>
                    </div>
                ) : (
                    <div></div>
                )}
                {this.memberItem.memberItems.operator.length ? (
                    <div>
                        <div>{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_OPERATOR")}</div>
                        <div>{this.renderMemberItem(this.memberItem.memberItems.operator, true)}</div>
                    </div>
                ) : (
                    <div></div>
                )}
                {this.memberItem.memberItems.method.length ? (
                    <div>
                        <div>{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_METHOD")}</div>
                        <div>{this.renderMemberItem(this.memberItem.memberItems.method, true)}</div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }

    private renderTitle(): React.ReactNode {
        return (
            <div className="docs_api_members_base_title_root">
                <div className="docs_api_members_base_title_name">{this.memberItem.name}</div>
                <div className="docs_api_members_base_title_type">{this.msgBundle.getI18n(this.memberItem.type)}</div>
            </div>
        );
    }

    private renderDefine(): React.ReactNode {
        const defines: React.ReactNode[] = [];

        for (const item of this.memberItem.memberDefs) {
            const itemDef = (
                <div key={item.name} className="docs_api_members_base_define_content_item">
                    <div className="docs_api_members_base_define_content_item_file">{`${this.msgBundle.getI18n(
                        "TIANYU_DEV_DOCS_API_MEMBER_DEFINE_ITEM_FILE",
                    )} ${item.file}`}</div>
                    <div className="docs_api_members_base_define_content_item_desc">{item.i18n}</div>
                    <div className="docs_api_members_base_define_content_item_def">
                        <div className="docs_api_members_base_define_content_item_def_title">
                            {this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_TITLE")}
                        </div>
                        <div className="docs_api_members_base_define_content_item_def_code">{item.def}</div>
                    </div>
                    {item.example.length ? (
                        <div>
                            <div>{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_EXAMPLE")}</div>
                            <div>{item.example}</div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            );

            defines.push(itemDef);
        }

        return (
            <div className="docs_api_members_base_define_root">
                <div className="docs_api_members_base_define_title">
                    {this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_MEMBER_DEFINE_TITLE")}
                </div>
                <div className="docs_api_members_base_define_content">{defines}</div>
            </div>
        );
    }

    private renderMemberItem(items: INamespaceMemberItem[], canClick = false): React.ReactNode {
        const defines: React.ReactNode[] = [];

        for (const def of items) {
            const item = (
                <div>
                    <div>{def.def}</div>
                    <div>{this.msgBundle.getI18n(def.i18n)}</div>
                </div>
            );

            defines.push(item);
        }

        return <div>{defines}</div>;
    }

    protected override loadDataSuccess(): void {
        this.memberItem = {
            name: "",
            type: "",
            memberDefs: [],
            memberItems: {
                constructor: [],
                property: [],
                operator: [],
                method: [],
            },
        };
        const rawData = this.getReceiveData();

        const name: string = rawData["name"];
        const type: string = rawData["type"];

        if (!name || !type) {
            throw Error();
        }

        this.memberItem.name = name;
        this.memberItem.type = type;

        for (const defItem of rawData["memberDefs"]) {
            const def: INamespaceMemberDef = {
                name: defItem["name"],
                i18n: defItem["i18n"],
                file: defItem["file"],
                def: defItem["def"],
                example: [],
            };

            for (const example of defItem["example"]) {
                def.example.push(example);
            }

            this.memberItem.memberDefs.push(def);
        }

        this.memberItem.memberItems.constructor = this.loadMemberItems(rawData["memberItems"], "constructor");
        this.memberItem.memberItems.property = this.loadMemberItems(rawData["memberItems"], "property");
        this.memberItem.memberItems.operator = this.loadMemberItems(rawData["memberItems"], "operator");
        this.memberItem.memberItems.method = this.loadMemberItems(rawData["memberItems"], "method");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private loadMemberItems(memberItems: any, itemKey: string): INamespaceMemberItem[] {
        const items: INamespaceMemberItem[] = [];

        for (const item of memberItems[itemKey]) {
            const def: INamespaceMemberItem = {
                name: item["name"],
                i18n: item["i18n"],
                type: item["type"],
                def: item["def"],
            };

            items.push(def);
        }

        return items;
    }

    private onHashChanged(ev: HashChangeEvent): void {
        if (this.preHashChanged) {
            this.preHashChanged(ev);
        }

        this.setSId(getAPIMemberDocsRemote());

        this.setDataInvalid(DynamicInvalidTargetState.Reload);
    }
}
