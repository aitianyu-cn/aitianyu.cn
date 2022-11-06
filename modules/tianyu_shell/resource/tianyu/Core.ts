/**@format */

import { FetchFileLoader } from "ts-core/FileLoader";
import { CallbackAction, CallbackActionT, HashChangedCallback, MapOfType } from "ts-core/Types";

export {};

const HashChangeEventOnLoaded: string = "tianyushell_core_hashchanged_init_trigger";

const Cookie: ITianyuShellCookie = {
    set: function (key: string, value: string, domain?: string, path?: string, expires?: Date, escaped?: boolean): void {
        const escapeValue = escaped ? value : encodeURI(value);
        const expiresPart = expires ? `; expires=${expires.toUTCString()}` : "";
        const pathPart = path ? `; path=${path}` : "; path=/";
        const domainPart = domain ? `; domain=${domain}` : "";

        document.cookie = `${key}=${escapeValue}${expiresPart}${pathPart}${domainPart}`;
    },

    get: function (key: string, notFound: string = ""): string {
        const result = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`));

        return (result && encodeURI(result[2])) || notFound;
    },

    remove: function (key: string, path?: string, domain?: string): void {
        if (!!!this.get(key)) {
            return;
        }

        const pathPart = path ? `; path=${path}` : "; path=/";
        const domainPart = domain ? `; domain=${domain}` : "";
        document.cookie = `${key}=${pathPart}${domainPart};expires=Fri, 02-Jan-1970 00:00:00 GMT`;
    },
};

const _bodyLoadedListeners: Record<string, CallbackAction> = {};
const _registerLoadedListener = function (listener: string, callback: CallbackAction): void {
    _bodyLoadedListeners[listener] = callback;
};
const _unregisterLoadedListener = function (listener: string): void {
    if (_bodyLoadedListeners[listener]) {
        delete _bodyLoadedListeners[listener];
    }
};
const _containsLoadedListener = function (listener: string): boolean {
    return !!_bodyLoadedListeners[listener];
};
const fnOnBodyLoaded = () => {
    for (const listener of Object.keys(_bodyLoadedListeners)) {
        _bodyLoadedListeners[listener]();
    }
};

const _hashChangedListeners: Record<string, HashChangedCallback> = {};
const _registHashChangedListener = function (listener: string, callback: HashChangedCallback): void {
    _hashChangedListeners[listener] = callback;
};
const _unregistHashChangedListener = function (listener: string): void {
    if (_hashChangedListeners[listener]) {
        delete _hashChangedListeners[listener];
    }
};
const _containsHashChangedListener = function (listener: string): boolean {
    return !!_hashChangedListeners[listener];
};
const fnOnHashChanged = (ev?: HashChangeEvent) => {
    const hash = (window.location.hash as string).substring(1);
    for (const listener of Object.keys(_hashChangedListeners)) {
        _hashChangedListeners[listener](hash, ev);
    }

    _unregisterLoadedListener(HashChangeEventOnLoaded);
};

interface IStaticFileCache {
    value: any;
    valid: boolean;
    waitList: CallbackActionT<any>[];
}
const _staticFileCache: MapOfType<IStaticFileCache> = {};
const _loadStaticFile = async function (name: string): Promise<any> {
    if (!!!name) {
        return;
    }

    if (!!!_staticFileCache[name]) {
        _staticFileCache[name] = {
            value: null,
            valid: false,
            waitList: [],
        };
        return new Promise<any>((resolve, _reject) => {
            const fileLoader = new FetchFileLoader(`/static/${name}`);
            fileLoader.openAsync().then((value: any) => {
                _staticFileCache[name].value = value;
                _staticFileCache[name].valid = true;
                for (const waitCallback of _staticFileCache[name].waitList) {
                    waitCallback(value);
                }
                if (!!!value) {
                    delete _staticFileCache[name];
                }
                resolve(value);
            });
        });
    }

    if (_staticFileCache[name].valid) {
        return _staticFileCache[name].value;
    }

    return new Promise<any>((resolve, _reject) => {
        _staticFileCache[name].waitList.push(resolve);
    });
};
const _getStaticFile = function (name: string): any {
    return _staticFileCache[name];
};
const _containStaticFile = function (name: string): boolean {
    return Object.keys(_staticFileCache).includes(name);
};
const _unloadStaticFile = function (name: string): void {
    if (_staticFileCache[name]) {
        delete _staticFileCache[name];
    }
};

async function initiation(): Promise<void> {
    if (!!!(window as any)["tianyuShell"]) {
        (window as any)["tianyuShell"] = {};
    }

    tianyuShell["core"] = {
        cookie: Cookie,
        cache: {
            static: {
                load: _loadStaticFile,
                get: _getStaticFile,
                contains: _containStaticFile,
                unload: _unloadStaticFile,
            },
        },
        event: {
            onLoaded: {
                listen: _registerLoadedListener,
                removeListen: _unregisterLoadedListener,
                contains: _containsLoadedListener,
            },
            onhashChanged: {
                listen: _registHashChangedListener,
                removeListen: _unregistHashChangedListener,
                contains: _containsHashChangedListener,
            },
        },
    };

    document.body.onload = fnOnBodyLoaded;
    window.onhashchange = fnOnHashChanged;

    // if the default hash is not "#" or empty, to trigger an onHashChanged Event manually.
    if (location.hash.length > 0 && location.hash !== "#") {
        _registerLoadedListener(HashChangeEventOnLoaded, fnOnHashChanged);
    }

    // to load configure file
    const config = await _loadStaticFile("configuration.json");
    if (config) {
        tianyuShell.core.runtime = {
            console: !!config.runtime?.console,
            environment: ((config.environment || "development") as string).toLowerCase(),
        };
    }
}

initiation();
