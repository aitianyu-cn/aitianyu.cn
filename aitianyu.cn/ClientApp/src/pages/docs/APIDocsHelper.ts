/**@format */

import { formatedLocationArea } from "src/dty/core/AreaHelper";
import { FeatureToggle } from "src/dty/core/FeatureToggle";

export enum APIDocsDisplayType {
    Unknown,
    Namespaces,
    Members,
    Item,
}

export function getAPIDocsRemote(): string {
    const path = window.location.pathname.substring(10);

    if (
        FeatureToggle.isActive("AITIANYU_CN_WEB_DOCS_API_MEMBER_ITEM_PAGE_VALID") &&
        getAPIDocsDisplayType() === APIDocsDisplayType.Item &&
        window.location.hash &&
        window.location.hash !== "#"
    ) {
        const hashName = window.location.hash.substring(1);

        return `${path}/${hashName}`;
    }

    return path;
}

export function getAPIDocsDisplayType(): APIDocsDisplayType {
    const path = window.location.pathname.substring(10);
    const aPaths: string[] = [];

    for (const pathItem of path.split("/")) {
        pathItem && aPaths.push(pathItem);
    }

    switch (aPaths.length) {
        case 1:
            return APIDocsDisplayType.Namespaces;
        case 2:
            return APIDocsDisplayType.Members;
        case 3:
            return APIDocsDisplayType.Item;
        case 0:
        default:
            return APIDocsDisplayType.Unknown;
    }
}

export function getAPIMemberDocsRemote(): string {
    const path = window.location.pathname.substring(10);
    const hash = window.location.hash.replaceAll("#", "");

    return `${path}/${hash}`;
}

export function getArchDocsRemote(): string {
    return window.location.pathname.substring(11);
}

export function getArchDocsView(): string {
    return window.location.hash.substring(1);
}

export function getLanguage(): string {
    return localStorage["language"] || formatedLocationArea();
}
