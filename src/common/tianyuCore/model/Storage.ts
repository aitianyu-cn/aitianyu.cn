/** @format */

import { AreaCode } from "../AreaCode";
import { Environment } from "../EnvirDefs";
import { IStorage, fnIStorageValueChange } from "../api/IStorage";

export const sStorageAreaString: string = "Tianyu::Storage::Area";

interface IValueSet {
    [key: string]: any;
}
interface IValueRegisters {
    [key: string]: fnIStorageValueChange[];
}

export class StorageBase implements IStorage {
    private _oEnvironment: Environment;
    private _oValues: IValueSet;

    constructor(environment: Environment = Environment.DEVELOP) {
        this._oEnvironment = environment;

        this._oValues = {};
        this._oValues[sStorageAreaString] = {
            value: AreaCode.zh_CN,
            callback: {},
        };
    }

    public isReleaseMode(): boolean {
        return this._oEnvironment === Environment.RELEASE;
    }
    public isDevelopMode(): boolean {
        return this._oEnvironment === Environment.DEVELOP;
    }
    public isDebugMode(): boolean {
        return this._oEnvironment === Environment.DEBUG;
    }

    public getArea(): AreaCode {
        return this._oValues[sStorageAreaString].value;
    }
    public setArea(area: AreaCode): void {
        this._oValues[sStorageAreaString].value = area;
        this._valueChanged(sStorageAreaString);
    }

    public getEnvironment(): Environment {
        return this._oEnvironment;
    }

    public clear(): void {
        const oAreaCache: any = this._oValues[sStorageAreaString];

        this._oValues = {};
        this._oValues[sStorageAreaString] = oAreaCache;
    }

    public getValue(sKey: string): any {
        if (!!sKey) {
            const isValueExist: boolean = !!this._oValues[sKey];
            return isValueExist ? this._oValues[sKey].value : null;
        }

        return undefined;
    }
    public setValue(sKey: string, oValue: any): void {
        if (!!sKey && this._checkValueOperatble(sKey)) {
            if (!!this._oValues[sKey]) {
                this._oValues[sKey].value = oValue;
                setTimeout(this._valueChanged.bind(this), 0);
            } else {
                this._oValues[sKey] = {
                    value: oValue,
                    callback: {},
                };
            }
        }
    }
    public delValue(sKey: string): void {
        if (!!sKey && this._checkValueOperatble(sKey) && this._oValues[sKey]) {
            delete this._oValues[sKey];
        }
    }

    public addWatcher(sKey: string, sWatcher: string, fnCallback: fnIStorageValueChange): boolean {
        if (!!sKey && !!sWatcher && !!fnCallback) {
            if (!!!this._oValues[sKey]) {
                this._oValues[sKey] = {
                    value: null,
                    callback: {},
                };
            }
            this._oValues[sKey].callback[sWatcher] = fnCallback;
        }

        return false;
    }
    public delWatcher(sKey: string, sWatcher: string): void {
        if (!!sKey && !!sWatcher) {
            !!this._oValues[sKey] && !!this._oValues[sKey].callback[sWatcher] && delete this._oValues[sKey].callback[sWatcher];
        }
    }

    private _valueChanged(sKey: string) {
        if (!!!sKey) {
            return;
        }

        const newValue = this._oValues[sKey].value;
        const watchers = this._oValues[sKey].callback;
        Object.keys(watchers).forEach((watcher) => {
            if (!!watchers[watcher]) {
                setTimeout(() => {
                    const fnCallback = watchers[watcher];
                    fnCallback(sKey, newValue);
                }, 0);
            }
        });
    }
    private _checkValueOperatble(sKey: string): boolean {
        if (sKey === sStorageAreaString) {
            return false;
        }
        return true;
    }
}

export const sAreaCodeKey: string = "AITIANYU::STORAGE::AREACODE";
