/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import { AreaCode } from "../common/AreaCode";

export function getMsgTargetObject(target: string, area: AreaCode): any {
    if (target === "app") {
        return getAppMsgObject(area);
    } else {
        return getPageMsgObject(area);
    }
}

function getAppMsgObject(area: AreaCode): any {
    switch (area) {
        case AreaCode.en_US:
            return require(`${process.env.PUBLIC_URL}/i18n/app/international_en_US.json`);
        case AreaCode.zh_CN:
        default:
            return require("i18n/app/international_zh_CN.json");
    }
}

function getPageMsgObject(area: AreaCode): any {
    switch (area) {
        case AreaCode.en_US:
            return require("i18n/page/international_en_US.json");
        case AreaCode.zh_CN:
        default:
            return require("i18n/page/international_zh_CN.json");
    }
}