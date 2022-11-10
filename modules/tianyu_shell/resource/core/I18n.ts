/**@format */

import { Language } from "./Language";

export interface IMessageBundle {
    getText(key: string): string;
}

export const emptyMsgBundle: IMessageBundle = {
    getText: (key: string) => key,
};

export function require_msgbundle(file: string, project: string = "global"): IMessageBundle {
    try {
        const configure = tianyuShell.core.cache.static.get("configuration.json");
        if (configure?.value?.environment === "production") {
            return require(`tianyu-i18n/${project}/${file}_${Language.toString()}.msgbundle`);
        }
        return require(`tianyu-i18n/${project}/${file}.msgbundle`);
    } catch {
        return emptyMsgBundle;
    }
}
