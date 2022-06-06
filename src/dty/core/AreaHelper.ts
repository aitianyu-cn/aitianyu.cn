/**@format */

import { AreaCode } from "./AreaCode";

export function getAreaFromString(areaString?: string): AreaCode {
    const lowCase: string = areaString ? areaString.toLowerCase() : "zh_cn";

    switch (lowCase) {
        case "en_us":
            return AreaCode.en_US;
        case "zh_cn":
            return AreaCode.zh_CN;
        default:
            return AreaCode.zh_CN;
    }
}

export function getLocationArea(): AreaCode {
    const sLocalArea = navigator.language;

    return getAreaFromString(sLocalArea);
}

export function formatedLocationArea(): string {
    const sLocalArea = navigator.language;

    const formated = sLocalArea.replace("-", "_");

    return formated;
}
