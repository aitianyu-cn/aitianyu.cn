/**@format */

import { Configure } from "src/dty/core/Configure";
import { initFeatures } from "src/dty/core/Feature";
import { loadMsgSource } from "src/dty/i18n/MsgBundle";
import { loadLanguageSource } from "src/pages/language/Language";

export interface IInitialSourceItem {
    invoker: () => Promise<void>;
}

export interface IInitialSource {
    [key: string]: IInitialSourceItem;
}

export const InitialSource: IInitialSource = {
    initConfigure: {
        invoker: async () => {
            Configure.initConfigure();
        },
    },
    initFeature: {
        invoker: initFeatures,
    },
    initLanguages: {
        invoker: loadLanguageSource,
    },
    initI18nInternal: {
        invoker: async () => {
            const name = "international";
            await loadMsgSource(name);
        },
    },
};
