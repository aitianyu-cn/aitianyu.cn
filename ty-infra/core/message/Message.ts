/**@format */

import { MapOfString, StringHelper } from "@aitianyu.cn/types";
import { Language } from "@aitianyu.cn/tianyu-shell/core";

const _i18nModuleCache: {
    [packageName: string]: {
        [lang: string]: __WebpackModuleApi.RequireContext;
    };
} = {};

export const DEFAULT_LANGUAGE = "DEFAULT_LANGUAGE";

export type i18nModuleName = "infra" | "app" | "home";

export function setI18nModuleCache(lang: string, packageName: i18nModuleName, module: __WebpackModuleApi.RequireContext): void {
    if (!_i18nModuleCache[packageName]) {
        _i18nModuleCache[packageName] = {};
    }
    _i18nModuleCache[packageName][lang] = module;
}

export function getI18nModuleCache(lang: string, packageName: i18nModuleName): __WebpackModuleApi.RequireContext | undefined {
    return _i18nModuleCache[packageName]?.[lang];
}

function formatText(map: MapOfString, id: string, args?: (string | number)[] | string): string {
    const value = map[id] ? map[id].trim() : undefined;
    if (value && args) {
        return StringHelper.format(value, args);
    }
    return value || "";
}

function getText(
    packageName: i18nModuleName,
    file: string,
    key: string,
    lang: string,
    params?: (string | number)[] | string,
): string | null {
    const requireContext = getI18nModuleCache(lang, packageName);
    const fileName = `./${file}${lang !== DEFAULT_LANGUAGE ? `_${lang}` : ""}.properties`;
    let resource;
    try {
        resource = requireContext ? requireContext(fileName) : undefined;
    } catch {
        // In infra designing
        // the error when require the i18n source file that does not need to do especial handling.
    }
    const formattedResource: string | undefined = resource && formatText(resource, key, params);
    if (formattedResource) {
        try {
            // return unescape(encodeURI(formattedResource.replace(/\"/g, '\\"')));
            return unescape(JSON.parse(`"${formattedResource}"`));
        } catch {
            // When the value formating cause an error, to return the raw value instead.
        }
    }
    return formattedResource || "";
}

export function getTextFromFile(
    packageName: i18nModuleName,
    file: string,
    key: string,
    params?: (string | number)[] | string,
    fallString?: string,
): string {
    return (
        getText(packageName, file, key, Language.toString(), params) ||
        getText(packageName, file, key, DEFAULT_LANGUAGE, params) ||
        fallString ||
        key
    );
}
