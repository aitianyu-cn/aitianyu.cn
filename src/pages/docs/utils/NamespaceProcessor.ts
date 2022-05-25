/**@format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IMsgBundle } from "src/dty/i18n/MsgBundle";
import { INamespaceContainer, INamespaceMember } from "./Interfaces";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function NamespaceProcessor(json: any, msgBundle: IMsgBundle): INamespaceContainer {
    const oDataTypes: INamespaceContainer = {
        class: [],
        delegate: [],
        enum: [],
        function: [],
        interface: [],
        struct: [],
        property: [],
    };

    if (Array.isArray(json)) {
        for (const jsonItem of json) {
            const oData: INamespaceMember = {
                name: jsonItem["name"] || "",
                i18n: msgBundle.getI18n(jsonItem["i18n"] || ""),
                file: jsonItem["file"] || "",
                def: jsonItem["def"] || "",
            };

            if (jsonItem["type"]) {
                const lowCaseType: string = ((jsonItem["type"] as string) || "").toLowerCase();
                switch (lowCaseType) {
                    case "class":
                        oDataTypes.class.push(oData);
                        break;
                    case "enum":
                        oDataTypes.enum.push(oData);
                        break;
                    case "delegate":
                        oDataTypes.delegate.push(oData);
                        break;
                    case "function":
                        oDataTypes.function.push(oData);
                        break;
                    case "interface":
                        oDataTypes.interface.push(oData);
                        break;
                    case "struct":
                        oDataTypes.struct.push(oData);
                        break;
                    case "property":
                        oDataTypes.property.push(oData);
                        break;
                }
            }
        }
    }

    return oDataTypes;
}
