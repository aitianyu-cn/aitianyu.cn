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

export function getSearchParameters(): IParameter[] {
    const search = location.search.substring(1, location.search.length);

    const aSearchItems: string[] = [];
    for (const sourceItem of search.split("&")) {
        sourceItem && aSearchItems.push(sourceItem);
    }

    if (!aSearchItems.length) {
        return [];
    }

    const aParameters: IParameter[] = [];
    for (const item of aSearchItems) {
        const itemMatch = item.match(/=/);
        if (!itemMatch) {
            continue;
        }

        const parameterKey = item.substring(0, itemMatch.index);
        const parameterValue = item.substring((itemMatch.index || 0) + 1);
        aParameters.push({
            key: parameterKey,
            value: convertParameterValue(parameterValue),
        });
    }

    return aParameters;
}

function convertParameterValue(rawValue: string): string {
    if (!rawValue) {
        return rawValue;
    }

    return decodeURI(rawValue);
}
