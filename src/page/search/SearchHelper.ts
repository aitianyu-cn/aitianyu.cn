/**@format */

import { IParameter } from "../../dty/common/RouteHelp";

export enum SearchType {
    All,
    Download,
    Project,
    Docs,
}

export function getSearchType(): SearchType {
    const hashData = location.hash;

    switch (hashData) {
        case "#download":
            return SearchType.Download;
        case "#project":
            return SearchType.Project;
        case "#docs":
            return SearchType.Docs;
        default:
            return SearchType.All;
    }
}
