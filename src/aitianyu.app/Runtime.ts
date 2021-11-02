import { LanguageBase } from "../common/international/Language";
import { StorageBase } from "../common/Storage";
import { Environment } from "../common/tianyuCore/Environment";

export const Storage: StorageBase = new StorageBase();
export const Language: LanguageBase = new LanguageBase();
export function isReleaseMode(): boolean {
    return Storage.getEnvironment() === Environment.RELEASE;
};
export function isDevelopMode(): boolean {
    return Storage.getEnvironment() === Environment.DEVELOP;
};
export function isDebugMode(): boolean {
    return Storage.getEnvironment() === Environment.DEBUG;
};