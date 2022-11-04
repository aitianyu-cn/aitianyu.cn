/**@format */

import { CallbackAction, CallbackActionT } from "../core/Types";
import { parseAreaString, areaCodeToString, AreaCode } from "../core/AreaHelper";

export {};

const languageSupport = require("ts-static/language/config.json")?.support;
const fnGenerateLanguageSupporting = function (): string[] {
    const list: string[] = [];
    if (!!!languageSupport) {
        for (const lang of Object.keys(AreaCode)) {
            Number.isNaN(Number.parseInt(lang)) && lang !== "unknown" && list.push(lang);
        }

        return list;
    }

    if (typeof languageSupport === "string") {
        const area = parseAreaString(languageSupport);
        list.push(AreaCode.unknown !== area ? languageSupport : "zh_cn");

        return list;
    }

    if (Array.isArray(languageSupport)) {
        for (const langItem of languageSupport) {
            const area = parseAreaString(langItem);
            AreaCode.unknown !== area && list.push(langItem);
        }

        list.length === 0 && list.push("zh_cn");
        return list;
    }

    return ["zh_cn"];
};

const supportLanguage = fnGenerateLanguageSupporting();

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

        tianyuShell.core.cookie.set(LANGUAGE_COOKIE_ID, areaString);

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
};

function initiation(): void {
    tianyuShell.core.language = Language;
}

initiation();
