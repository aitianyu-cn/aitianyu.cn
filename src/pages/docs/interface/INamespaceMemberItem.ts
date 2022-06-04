/**@format */

export interface INamespaceMember {
    name: string;
    type: string;

    memberDefs: INamespaceMemberDef[];
    memberItems: INamespaceMemberItems;
}

export interface INamespaceMemberDef {
    name: string;
    i18n: string;
    file: string;
    def: string;
    example: INamespaceMemberExample[];
}

export interface INamespaceMemberExample {
    key: string;
    i18ns: string[];
    exampleLines: string[];
}

export interface INamespaceMemberItem {
    key: string;
    name: string;
    i18n: string;
    def: string;
    type: string;
}

export interface INamespaceMemberItems {
    constructor: INamespaceMemberItem[];
    property: INamespaceMemberItem[];
    operator: INamespaceMemberItem[];
    method: INamespaceMemberItem[];
}

export interface INamespaceDataTypeMemberItemAdditional {
    dataType: string;
    i18n: string;
}

export interface INamespaceDataTypeMemberItem extends INamespaceMemberItem {
    example: string;
    parameters: {
        [key: string]: INamespaceDataTypeMemberItemAdditional;
    };
    return: {
        [key: string]: string;
    };
    exceptions: {
        [key: string]: string;
    };
}
