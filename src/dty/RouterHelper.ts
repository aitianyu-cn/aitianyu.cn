/**@format */

import { Configure } from "./core/Configure";
import { IParameters } from "./model/Interfaces";

export function getLocationPath(level = 0): string {
    const aPathes = getLocationPathes();
    if (-1 === level || aPathes.length <= level) {
        return aPathes[aPathes.length - 1];
    }

    return aPathes[level];
}

export function getLocationPathes(): string[] {
    const sUrlHash = window.location.pathname;

    const aPathes: string[] = [];
    for (const path of sUrlHash.split("/")) {
        path && aPathes.push(path);
    }

    return aPathes;
}

export function setLanguage(areaCode: string): void {
    const newUrl = `${window.location.origin}/`;

    Configure.generateConfigure().setArea(areaCode, true);
    window.location.replace(newUrl);
}

export function getSearchParameterObj(): IParameters {
    const search = window.location.search.substring(1, window.location.search.length);

    const aSearchItems: string[] = [];
    for (const sourceItem of search.split("&")) {
        sourceItem && aSearchItems.push(sourceItem);
    }

    if (!aSearchItems.length) {
        return {};
    }

    const oParameters: IParameters = {};
    for (const item of aSearchItems) {
        const itemMatch = item.match(/=/);
        if (!itemMatch) {
            continue;
        }

        const parameterKey = item.substring(0, itemMatch.index);
        const parameterValue = item.substring((itemMatch.index || 0) + 1);
        oParameters[parameterKey] = convertParameterValue(parameterValue);
    }

    return oParameters;
}

function convertParameterValue(rawValue: string): string {
    if (!rawValue) {
        return rawValue;
    }

    return decodeURI(rawValue);
}
