/**@format */

import { parseAreaString, areaCodeToString, AreaCode } from "./AreaHelper";
import { Exception, TianyuShellLostException, TianyuShellLanguageLost } from "./ExceptionBase";
import { CallbackAction, CallbackActionT } from "./Types";
import { validateTianyuShellLanguage } from "./Utilities";

class LanguageParseException extends Exception {
    public constructor(errorString: string) {
        super(errorString);
    }

    public override toString(): string {
        return `未知的语言类型：${this.message}`;
    }
}

export class Language {
    public static set(language: AreaCode, callback?: CallbackAction, eventSync?: boolean): void {
        if (!validateTianyuShellLanguage()) {
            throw new TianyuShellLostException(TianyuShellLanguageLost);
        }

        tianyuShell.core.language?.set(language, callback, eventSync);
    }

    public static getLocalLanguage(): AreaCode {
        if (!validateTianyuShellLanguage()) {
            throw new TianyuShellLostException(TianyuShellLanguageLost);
        }

        return tianyuShell.core.language?.get() || Language.getDefaultLanguage();
    }

    public static getDefaultLanguage() {
        const defaultLanguage = navigator.language.replace("-", "_");

        return parseAreaString(defaultLanguage);
    }

    public static addListener(listener: string, callback: CallbackActionT<AreaCode>): void {
        if (!validateTianyuShellLanguage()) {
            throw new TianyuShellLostException(TianyuShellLanguageLost);
        }

        tianyuShell.core.language?.addListener(listener, callback);
    }

    public static removeListener(listener: string): void {
        if (!validateTianyuShellLanguage()) {
            throw new TianyuShellLostException(TianyuShellLanguageLost);
        }

        tianyuShell.core.language?.removeListener(listener);
    }

    public static parse(language: string): AreaCode {
        const areaCode = parseAreaString(language, true /**to force the area code */);

        if (AreaCode.unknown === areaCode) {
            throw new LanguageParseException(language);
        }

        return areaCode;
    }

    public static toString(language?: AreaCode): string {
        if (!!language) {
            return areaCodeToString(language);
        }

        const localLanguage = Language.getLocalLanguage();
        return areaCodeToString(localLanguage);
    }
}
