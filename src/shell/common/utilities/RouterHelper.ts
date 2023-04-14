/**@format */

import { Router } from "ts-core/Router";
import { MapOfString } from "ts-core/Types";

export function routerUrl2Id(url: string): string {
    let id = "";

    for (const ch of url) {
        const transChar = ch === "/" ? "_" : ch;
        id += transChar;
    }

    return id;
}

function _parseHashParams(hashParam: string): MapOfString {
    const result: MapOfString = {};

    if (!!hashParam) {
        const paramPairs = hashParam.split("&");
        for (const pair of paramPairs) {
            const pairKV = pair.split("=");
            if (pairKV.length > 1) {
                const key = pairKV[0];
                let value = pairKV[1];
                for (let i = 2; i < pairKV.length; ++i) value += `=${pairKV[i]}`;

                result[key] = value;
            }
        }
    }

    return result;
}

export function parseHashParams(): MapOfString {
    const hashUrl = Router.getHash();
    const hashParam = hashUrl.split("?")[1] || "";

    return _parseHashParams(hashParam);
}

function _stringifyHashParam(params: MapOfString): string {
    let paramString = "";

    const paramsArray: string[] = [];
    for (const key of Object.keys(params)) paramsArray.push(`${key}=${params[key]}`);

    if (paramsArray.length > 0) paramString = `?${paramsArray.join("&")}`;

    return paramString;
}

export function addHashParam(key: string, value: string): void {
    const hashUrls = Router.getHash().split("?");
    const pureUrl = hashUrls[0];
    const hashParam = hashUrls[1] || "";

    const params = _parseHashParams(hashParam);
    params[key] = value;

    const newParam = _stringifyHashParam(params);

    Router.jump(`${pureUrl}${newParam}`);
}

export function setHashParams(params: MapOfString): void {
    const hashUrls = Router.getHash().split("?");
    const pureUrl = hashUrls[0];

    const newParam = _stringifyHashParam(params);

    Router.jump(`${pureUrl}${newParam}`);
}

export function stringifyParam(params: MapOfString): string {
    return _stringifyHashParam(params);
}
