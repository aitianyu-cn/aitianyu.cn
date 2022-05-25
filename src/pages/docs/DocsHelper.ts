/**@format */

import { IMsgBundle } from "src/dty/i18n/MsgBundle";

export interface ISourceItem {
    key: string;
    name: string;
    hash: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDocsSources(oSource: any, msgBundle: IMsgBundle): ISourceItem[] {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const aSourceList = oSource["docs"];
    if (!aSourceList || !Array.isArray(aSourceList) || aSourceList.length === 0) {
        return [];
    }

    const aItems: ISourceItem[] = [];
    for (const item of aSourceList) {
        const sName = item["name"];
        const sHash = item["hash"];

        if (!sName || !sHash) {
            continue;
        }

        let convertName = (sName as string) || "";
        const i18nMatch = convertName.match(/I18N=/);
        if (i18nMatch) {
            const subString = convertName.substring(5);
            convertName = msgBundle.getI18n(subString);
        }

        aItems.push({
            key: sName,
            name: convertName,
            hash: sHash,
        });
    }

    return aItems;
}
