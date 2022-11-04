/**@format */

import { Language } from "./Language";

export function require_msgbundle(file: string, project: string = "global"): any {
    const configure = tianyuShell.core.cache.static.get("configuration.json");
    if (configure?.environment === "development") {
        return require(`tianyu-i18n/${project}/${file}.msgbundle`);
    }
    return require(`tianyu-i18n/${project}/${file}_${Language.toString()}.msgbundle`);
}
