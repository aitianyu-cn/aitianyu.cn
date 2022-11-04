/**@format */

import { TianyuShellLostException, TianyuShellCoreLost } from "./ExceptionBase";
import { validateTianyuShellCore } from "./Utilities";

export interface ICookieSetOptions {
    domain?: string;
    path?: string;
    expires?: Date;
    escaped?: boolean;
}

export class Cookie {
    public static set(key: string, value: string, options?: ICookieSetOptions): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        tianyuShell.core.cookie.set(key, value, options?.domain, options?.path, options?.expires, options?.escaped);
    }

    public static get(key: string, notFound: string = ""): string {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        return tianyuShell.core.cookie.get(key, notFound);
    }

    public static remove(key: string, path?: string, domain?: string): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        return tianyuShell.core.cookie.remove(key, path, domain);
    }
}
