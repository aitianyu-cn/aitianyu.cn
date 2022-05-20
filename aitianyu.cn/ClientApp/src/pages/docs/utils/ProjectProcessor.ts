/**@format */

import { IProjectGlobal } from "./Interfaces";

export function ProjectProcessor(json: any): IProjectGlobal {
    const projectGlobal: IProjectGlobal = {
        macros: [],
        namespaces: [],
    };

    if (!json) {
        return projectGlobal;
    }

    const aNamespaces = json["namespaces"];
    if (Array.isArray(aNamespaces)) {
        for (const namespaceItem of aNamespaces) {
            projectGlobal.namespaces.push({
                space: namespaceItem,
            });
        }
    }

    const aMacros = json["macros"];
    if (Array.isArray(aMacros)) {
        for (const macroItem of aMacros) {
            projectGlobal.macros.push({
                macro: macroItem["macro"],
                value: macroItem["value"],
                file: macroItem["file"],
            });
        }
    }

    return projectGlobal;
}
