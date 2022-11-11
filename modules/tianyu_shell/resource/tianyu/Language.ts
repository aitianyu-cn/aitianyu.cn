/**@format */

import { CallbackAction, CallbackActionT } from "../core/Types";
import { parseAreaString, areaCodeToString, AreaCode } from "../core/AreaHelper";

export {};

const languageConfig = require("ts-static/language/config.json");
const fnGenerateLanguage = function (type: string): string[] {
    const list: string[] = [];
    if (!!!languageConfig[type]) {
        for (const lang of Object.keys(AreaCode)) {
            Number.isNaN(Number.parseInt(lang)) && lang !== "unknown" && list.push(lang);
        }

        return list;
    }

    if (typeof languageConfig[type] === "string") {
        const area = parseAreaString(languageConfig[type]);
        list.push(AreaCode.unknown !== area ? languageConfig[type] : "zh_cn");

        return list;
    }

    if (Array.isArray(languageConfig[type])) {
        for (const langItem of languageConfig[type]) {
            const area = parseAreaString(langItem);
            AreaCode.unknown !== area && list.push(langItem);
        }

        list.length === 0 && list.push("zh_cn");
        return list;
    }

    return ["zh_cn"];
};

const supportLanguage = fnGenerateLanguage("support");

const pendingLanguage = fnGenerateLanguage("pending");

const LANGUAGE_COOKIE_ID = "LANGUAGE";

const _listeners: Record<string, CallbackActionT<AreaCode>> = {};

const _containsListener = function (listener: string) {
    return !!_listeners[listener];
};

const _invokeListener = async function (language: AreaCode): Promise<any> {
    const aInvokePromises: Promise<void>[] = [];

    for (const listener of Object.keys(_listeners)) {
        const invokePrimise = new Promise<void>((resolve) => {
            try {
                _listeners[listener](language);
            } catch {
                // discard the error
            }

            resolve();
        });

        aInvokePromises.push(invokePrimise);
    }

    return Promise.all(aInvokePromises);
};

const Language = {
    set: function (language: AreaCode, callback?: CallbackAction, eventSync?: boolean): void {
        const areaString = areaCodeToString(language);
        if (!supportLanguage.includes(areaString)) {
            return;
        }

        const date = new Date(Date.now());
        const expires = new Date(date.setDate(date.getDate() + 30));
        tianyuShell.core.cookie.set(LANGUAGE_COOKIE_ID, areaString, undefined, undefined, expires);

        if (eventSync) {
            _invokeListener(language).finally(() => {
                callback?.();
            });
        } else {
            void _invokeListener(language);
            callback?.();
        }
    },

    get: function (): AreaCode {
        const defaultLanguage = navigator.language.replace("-", "_");
        const languageString = tianyuShell.core.cookie.get(LANGUAGE_COOKIE_ID, defaultLanguage);

        return parseAreaString(languageString);
    },

    addListener: function (listener: string, callback: CallbackActionT<AreaCode>): void {
        _listeners[listener] = callback;
    },

    removeListener: function (listener: string): void {
        if (!_containsListener(listener)) {
            return;
        }

        delete _listeners[listener];
    },

    supportLanguage: supportLanguage,

    pendingLanguage: pendingLanguage,
};

function initiation(): void {
    tianyuShell.core.language = Language;
}

initiation();
