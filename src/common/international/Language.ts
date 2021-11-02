/** @format */

import { StorageBase } from "../Storage";
import { Storage, isDebugMode, isDevelopMode } from "../../aitianyu.app/Runtime";
import { getAreaString } from "../tianyuCore/AreaCode";

export const LanguagePartDefault: string = "Core";

interface ILanguageRequireCache {
    [key: string]: any;
}
const iLanguageRequireCacheLimit: number = 10;

export class LanguageBase {
    private pLangRequires: ILanguageRequireCache;

    public constructor() {
        this.pLangRequires = {};
    }
    public destroy(): void {
        this.pLangRequires = {};
    }

    public getMessage(sPart: string, sSource: string): string {
        if (isDebugMode() || isDevelopMode()) {
            return sPart + "::" + sSource;
        }

        return this.readMessage(sPart, sSource);
    }

    private readMessage(sPart: string, sSource: string): string {
        const sUnknownMsg = "RELEASE::" + sPart + "::" + sSource;

        const oLoadResource = this.loadResource(sPart);
        return oLoadResource ? oLoadResource[sSource] ?? sUnknownMsg : sUnknownMsg;
    }
    private loadResource(sPart: string): any {
        const sI18nPath = generateI18nSourceId(sPart);
        if (this.pLangRequires[sI18nPath]) {
            return this.pLangRequires[sI18nPath].source;
        }

        const oLangSource = require(sI18nPath).langSource;
        if (!!oLangSource) {
            setTimeout(() => {
                this.resourceLRU.apply(this, [sI18nPath, oLangSource]);
            }, 0);
            return oLangSource;
        }

        return undefined;
    }
    private resourceLRU(sI18nPath: string, oLangSource: any): void {
        if (Object.keys(this.pLangRequires).length >= iLanguageRequireCacheLimit) {
            const oNow: number = Date.now();

            let sDeleteId: string | null = null;
            let iLifeTime: number = 0;
            Object.keys(this.pLangRequires).every((key: string) => {
                if (this.pLangRequires[key]) {
                    const lifeTime: number = oNow - this.pLangRequires[key].lifeTime;
                    if (lifeTime > iLifeTime) {
                        iLifeTime = lifeTime;
                        sDeleteId = key;
                    }
                    return true;
                }

                sDeleteId = key;
                return false;
            });

            if (sDeleteId !== null) {
                delete this.pLangRequires[sDeleteId];
            }
        }

        this.pLangRequires[sI18nPath] = {
            source: oLangSource,
            lifeTime: Date.now(),
        };
    }
}

const sRootFolder: string = "./resources/";
function generateI18nSourceId(sPart: string): string {
    const sAreaFolder: string = getAreaString(Storage.getArea());
    return sRootFolder + sAreaFolder + "/" + (!!sPart ? sPart : LanguagePartDefault) + ".ts";
}
