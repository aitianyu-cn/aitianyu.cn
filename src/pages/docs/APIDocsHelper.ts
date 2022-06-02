/**@format */

export enum APIDocsDisplayType {
    Unknown,
    Namespaces,
    Members,
    Item,
}

export function getAPIDocsRemote(): string {
    const path = window.location.pathname.substring(10);

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
