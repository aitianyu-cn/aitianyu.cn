/**@format */

import { DEFAULT_LANGUAGE, setI18nModuleCache } from "./Message";
import { Language } from "@aitianyu.cn/tianyu-shell/core";

const _i18nRequireContexts: { [local: string]: () => Promise<void> } = {
    [DEFAULT_LANGUAGE]: async () =>
        require.ensure(
            [],
            (require: NodeRequire) => {
                setI18nModuleCache(
                    DEFAULT_LANGUAGE,
                    "infra",
                    require.context("../..", true, /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message.properties$/),
                );
                setI18nModuleCache(
                    DEFAULT_LANGUAGE,
                    "home",
                    require.context(
                        "../../../../ty-home",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message.properties$/,
                    ),
                );
            },
            "aitianyu-cn/i18n/default",
        ),
    ["zh_CN"]: async () =>
        require.ensure(
            [],
            (require: NodeRequire) => {
                setI18nModuleCache(
                    "zh_CN",
                    "infra",
                    require.context(
                        "../..",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_zh_CN.properties$/,
                    ),
                );
                setI18nModuleCache(
                    "zh_CN",
                    "home",
                    require.context(
                        "../../../../ty-home",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_zh_CN.properties$/,
                    ),
                );
            },
            "aitianyu-cn/i18n/zh_CN",
        ),
    ["en_US"]: async () =>
        require.ensure(
            [],
            (require: NodeRequire) => {
                setI18nModuleCache(
                    "en_US",
                    "infra",
                    require.context(
                        "../..",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_en_US.properties$/,
                    ),
                );
                setI18nModuleCache(
                    "en_US",
                    "home",
                    require.context(
                        "../../../../ty-home",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_en_US.properties$/,
                    ),
                );
            },
            "aitianyu-cn/i18n/en_US",
        ),
};

export async function loadMessage(): Promise<any> {
    return Promise.all([_i18nRequireContexts[DEFAULT_LANGUAGE]?.(), _i18nRequireContexts[Language.toString()]?.()]);
}
