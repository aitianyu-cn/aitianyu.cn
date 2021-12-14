/**@format */

import { AreaCode } from "../AreaCode";
import { Environment } from "../EnvirDefs";

export const StorageKeys: any = {
    Area: "Tianyu::Storage::Area",
};

export type fnIStorageValueChange = (sKey: string, changedValue: any) => boolean;

export interface IStorage {
    isReleaseMode(): boolean;
    isDevelopMode(): boolean;
    isDebugMode(): boolean;

    getArea(): AreaCode;
    setArea(area: AreaCode): void;
    getEnvironment(): Environment;

    clear(): void;
    getValue(sKey: string): any;
    setValue(sKey: string, oValue: any): void;
    delValue(sKey: string): void;
    addWatcher(sKey: string, sWatcher: string, fnCallback: fnIStorageValueChange): boolean;
    delWatcher(sKey: string, sWatcher: string): void;
}
