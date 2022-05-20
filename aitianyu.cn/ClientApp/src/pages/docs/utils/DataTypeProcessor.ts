/**@format */

import { IMsgBundle } from "src/dty/i18n/MsgBundle";
import { IDataTypeContainer, IDataTypeMember } from "./Interfaces";

export function DataTypeProcessor(json: any, msgBundle: IMsgBundle): IDataTypeContainer {
    const oDataType: IDataTypeContainer = {
        construct: [],
        operator: [],
        method: [],
        property: [],
        enum: [],
    };

    if (Array.isArray(json)) {
        for (const jsonItem of json) {
            const oData: IDataTypeMember = {
                name: jsonItem["name"] || "",
                i18n: msgBundle.getI18n(jsonItem["i18n"] || ""),
                def: jsonItem["def"] || "",
            };

            if (jsonItem["type"]) {
                const lowCaseType: string = ((jsonItem["type"] as string) || "").toLowerCase();
                switch (lowCaseType) {
                    case "construct":
                        oDataType.construct.push(oData);
                        break;
                    case "enum":
                        oDataType.enum.push(oData);
                        break;
                    case "method":
                        oDataType.method.push(oData);
                        break;
                    case "operator":
                        oDataType.operator.push(oData);
                        break;
                    case "property":
                        oDataType.property.push(oData);
                        break;
                }
            }
        }
    }

    return oDataType;
}
