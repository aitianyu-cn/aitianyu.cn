/**@format */

export enum DataTypes {
    Class,
    Enum,
    Function,
    Delegate,
    Interface,
    Struct,
    Property,
}

export interface IMacrodefMember {
    macro: string;
    value: string;
    file: string;
}

export interface INamespace {
    space: string;
    desc?: string;
}

export interface IProjectGlobal {
    macros: IMacrodefMember[];
    namespaces: INamespace[];
}

export interface INamespaceMember {
    name: string;
    i18n: string;
    file: string;
    def: string;
}

export interface INamespaceContainer {
    class: INamespaceMember[];
    enum: INamespaceMember[];
    function: INamespaceMember[];
    delegate: INamespaceMember[];
    interface: INamespaceMember[];
    struct: INamespaceMember[];
    property: INamespaceMember[];
}

export interface IDataTypeMember {
    name: string;
    i18n: string;
    def: string;
}

export interface IDataTypeContainer {
    construct: IDataTypeMember[];
    operator: IDataTypeMember[];
    method: IDataTypeMember[];
    property: IDataTypeMember[];
    enum: IDataTypeMember[];
}

// export function getDataTypeFromString(type: string): DataTypes {
//     const lowCaseType = type.toLowerCase();

//     switch (lowCaseType) {
//         case "class":
//             return DataTypes.Class;
//         case "enum":
//             return DataTypes.Enum;
//         case "function":
//             return Data
//     }
// }
