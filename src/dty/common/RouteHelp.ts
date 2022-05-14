/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import { Configure } from "./core/Configure";

export interface IHashParameter {
    key: string;
    value: string;
}

export interface IHashDecode {
    hash: string | null;
    params: IHashParameter[];
}

export function getLocationPath(level = 0): string {
    const sUrlHash = location.pathname;

    const aPathes: string[] = [];
    for (const path of sUrlHash.split("/")) {
        path && aPathes.push(path);
    }

    if (aPathes.length <= level) {
        return "";
    }

    return aPathes[level];
}

export function getLocationHash(level = 0): string | null {
    const sUrlHash = location.hash;

    const aHashs = sUrlHash.split("/");
    if (aHashs.length < 2) {
        return "";
    }

    return aHashs.length - 1 < level ? null : aHashs[level + 1];
}

export function getDecodeHash(hash: string): IHashDecode {
    const hashResult: IHashDecode = {
        hash: null,
        params: [],
    };

    if (hash.length === 0) {
        return hashResult;
    }

    const aHashAndParam = hash.split("?");
    if (aHashAndParam.length === 0) {
        return hashResult;
    }

    hashResult.hash = aHashAndParam[0];
    if (aHashAndParam.length === 1) {
        return hashResult;
    }

    for (let i = 1; i < aHashAndParam.length; ++i) {
        const aParameters = aHashAndParam[i].split("&");
        if (aParameters.length === 0) {
            continue;
        }

        for (let j = 0; j < aParameters.length; ++j) {
            const aKVPair = aParameters[j].split("=");
            if (aKVPair.length !== 0) {
                const oParam: IHashParameter = {
                    key: aKVPair[0],
                    value: "",
                };

                if (aKVPair.length > 1) {
                    const aValues: string[] = [];
                    for (let k = 1; k < aKVPair.length; ++k) {
                        aValues.push(aKVPair[k]);
                    }

                    oParam.value = aValues.join("=");
                }

                hashResult.params.push(oParam);
            }
        }
    }

    return hashResult;
}

export function setLanguage(areaCode: string): void {
    const newUrl = `${location.origin}/`;
    
    Configure.generateConfigure().setArea(areaCode, true);
    window.location.replace(newUrl);
}

export function validatePath(): boolean {
    const sUrlPath = location.pathname;
    return "/" === sUrlPath;
}