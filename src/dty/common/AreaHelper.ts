/**@format */

import { AreaCode } from "./AreaCode";

const AreaStrings = ["zh_CN", "en_US"];

export function validateAreaString(areaString: string): boolean {
    // this function should not be used
    return AreaStrings.includes(areaString);
}

export function getAreaString(areaCode: AreaCode): string {
    switch (areaCode) {
        case AreaCode.en_US:
            return "en_US";
        case AreaCode.zh_CN:
        default:
            return "zh_CN";
    }
}

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

    switch (sLocalArea) {
        case "en-US":
            return AreaCode.en_US;
        case "zh-CN":
        default:
            return AreaCode.zh_CN;
    }
}
