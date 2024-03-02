/**@format */

import { AreaCode, StringHelper } from "@aitianyu.cn/types";

const chineseLang = require("./i18n/zh_CN.json");
const englishLang = require("./i18n/en_US.json");

export class MessageBundle {
    public static getText(lang: AreaCode, key: string, ...params: (string | number)[]): string {
        const value = lang === AreaCode.en_US ? englishLang[key] : chineseLang[key];
        if (!value) {
            return key;
        }

        return StringHelper.format(value, params);
    }
}
