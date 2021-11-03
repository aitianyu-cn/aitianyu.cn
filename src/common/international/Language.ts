/** @format */

import { IStorage } from "../tianyuCore/api/IStorage";
import { getAreaString } from "../tianyuCore/AreaCode";

export const LanguagePartDefault: string = "Core";

interface ILanguageRequireCache {
    [key: string]: any;
}
const iLanguageRequireCacheLimit: number = 10;

export class LanguageBase {
    private static sRootFolder: string = "./resources/";

    private _oStorage: IStorage;
    private pLangRequires: ILanguageRequireCache;

    public constructor(storage: IStorage) {
        this._oStorage = storage;
        this.pLangRequires = {};
    }
    public destroy(): void {
        this.pLangRequires = {};
    }

    public getMessage(sPart: string, sSource: string): string {
        if (this._oStorage.isDebugMode() || this._oStorage.isDevelopMode()) {
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
        const sI18nPath = LanguageBase.generateI18nSourceId(this, sPart);
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
    private static generateI18nSourceId(oThis: LanguageBase, sPart: string): string {
        const sAreaFolder: string = getAreaString(oThis._oStorage.getArea());
        return LanguageBase.sRootFolder + sAreaFolder + "/" + (!!sPart ? sPart : LanguagePartDefault) + ".ts";
    }
}
