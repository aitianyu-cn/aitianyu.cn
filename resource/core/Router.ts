/**@format */

import { Exception, TianyuShellCoreLost, TianyuShellLostException, TianyuShellNotInitialException } from "./ExceptionBase";
import { guid } from "./Guid";
import { MapOfType } from "./Types";
import { validateTianyuShellCore } from "./Utilities";

export interface IRouteCallbackEvent {
    hash: string;
    oldURL?: string;
}

export type RouteCallback = (ev: IRouteCallbackEvent) => void;
export type MapOfRoutes = Record<string, RouteCallback>;

export const TianyuShellRouterHomePage = "tianyu_shell_router_home";

// ############################################
// Router Path Tree
// ############################################

interface IRouteNode {
    end: RouteCallback | null;
    children: MapOfType<IRouteNode>;
}

interface IRouteExpItem {
    regex: RegExp;
    end: RouteCallback;
    priority: number;
}

const FailRouteDefaultCallback: RouteCallback = (ev: IRouteCallbackEvent) => {
    console.log(`route path - /${ev.hash} is not accessiable`);
};

const RouteDefaultCallback: RouteCallback = (ev: IRouteCallbackEvent) => {
    console.log(`default route - /${ev.hash}`);
};

interface ICurrentRoute {
    hash: string;
    routeType: "Map" | "Exp";
    id: string;
    callback: RouteCallback;
}

class RouteTrie {
    private routeMap: IRouteNode;
    private routeExp: MapOfType<IRouteExpItem>;
    private failRoute: RouteCallback;
    private regexBase: boolean;

    private forceUpdate: boolean;
    private currentRoute: ICurrentRoute;

    public constructor() {
        this.routeMap = {
            end: RouteDefaultCallback,
            children: {},
        };
        this.routeExp = {};
        this.failRoute = FailRouteDefaultCallback;
        this.regexBase = false;

        this.forceUpdate = true;
        this.currentRoute = {
            hash: "",
            routeType: "Map",
            id: "",
            callback: FailRouteDefaultCallback,
        };
    }

    public forceRegex(force: boolean): void {
        this.regexBase = force;
    }

    public addPath(path: string, callback: RouteCallback): void {
        const formattedPath = path.startsWith("/") ? path.substring(1) : path;
        const dirs = formattedPath.split("/");

        const fnAddDir = function (dir: string, nodesMap: IRouteNode): IRouteNode {
            if (!Object.keys(nodesMap.children).includes(dir)) {
                nodesMap.children[dir] = {
                    end: null,
                    children: {},
                };
            }

            return nodesMap.children[dir];
        };

        let map = this.routeMap;
        for (const dir of dirs) {
            if (!!!dir) {
                continue;
            }

            map = fnAddDir(dir, map);
        }

        map.end = callback;
    }

    public removePath(path: string): void {
        const formattedPath = path.startsWith("/") ? path.substring(1) : path;
        const dirs = formattedPath.split("/");

        let fatherMap = null;
        let map = this.routeMap;
        let dirName = "";
        for (const dir of dirs) {
            if (!!!dir) continue;

            dirName = dir;
            fatherMap = map;
            map = map.children[dir];

            if (!!!map) break;
        }

        if (!!map) {
            if (!!!Object.keys(map.children).length) {
                delete fatherMap?.children[dirName];
            } else {
                map.end = null;
            }
        }
    }

    public removeRegex(id: string): void {
        if (this.routeExp[id]) {
            delete this.routeExp[id];
        }
    }

    public addRegex(id: string, reg: RegExp, callback: RouteCallback, priority: number): void {
        for (const existId of Object.keys(this.routeExp)) {
            const item = this.routeExp[existId];
            if (item.regex === reg && item.priority === priority) {
                return;
            }
        }

        this.routeExp[id] = {
            regex: reg,
            end: callback,
            priority: priority,
        };
    }

    public route(hash: string, ev?: HashChangeEvent): void {
        if (!this.forceUpdate && hash === this.currentRoute.hash) return;

        const dirs = hash.split("/");
        let map: IRouteNode | null = this.routeMap;

        const fnTestMap = function (dir: string, routeMap: IRouteNode): IRouteNode | null {
            let map: IRouteNode | null = null;

            for (const child of Object.keys(routeMap.children)) {
                if (dir === child || dir.startsWith(`${child}?`)) {
                    map = routeMap.children[child];
                    break;
                }
            }

            return map;
        };

        for (const dir of dirs) {
            if (!!!dir) {
                continue;
            }

            map = fnTestMap(dir, map);
            if (!!!map) break;
        }

        let routeType: "Map" | "Exp" = "Map";
        let fnRouter = null;
        if (!!map?.end) {
            fnRouter = map.end;
        }

        let id = null;
        if (this.regexBase || !!!fnRouter) {
            let priority: number | null = null;
            for (const expId of Object.keys(this.routeExp)) {
                const item = this.routeExp[expId];
                if (item.regex.test(hash)) {
                    if (priority === null || item.priority > priority) {
                        id = expId;
                        priority = item.priority;
                        fnRouter = item.end;
                    }
                }
            }
            if (priority !== null) {
                routeType = "Exp";
            }
        }

        // check the update state
        if (!this.forceUpdate) {
            if (routeType === this.currentRoute.routeType && fnRouter === this.currentRoute.callback) {
                if ((routeType === "Exp" && id === this.currentRoute.id) || routeType === "Map") {
                    return;
                }
            }
        }

        this.currentRoute.callback = fnRouter || this.failRoute;
        this.currentRoute.hash = hash;
        this.currentRoute.id = id || "";
        this.currentRoute.routeType = routeType;

        // Todo: when the UI finished, to support the document update
        const routeEvent: IRouteCallbackEvent = {
            hash: hash,
            oldURL: ev?.oldURL,
        };
        this.currentRoute.callback(routeEvent);
    }

    public setRouteFail(callback: RouteCallback): void {
        this.failRoute = callback;
    }

    public resetRouteFail(): void {
        this.failRoute = FailRouteDefaultCallback;
    }
}

// ############################################
// Router History
// ############################################

interface IRouterHistory {
    current: number;
    histories: string[];
    historyIds: string[];
}

const _routerHistory: IRouterHistory = {
    current: -1,
    histories: [],
    historyIds: [],
};

// ############################################
// Router Provider
// ############################################

interface IRouterSource {
    routerMap: RouteTrie;
}

const _routerSource: IRouterSource = {
    routerMap: new RouteTrie(),
};

function _setHashCode(hash: string): void {
    const formattedHash = hash.replace("//", "/");
    window.location.hash = `#${formattedHash}`;
}

const RouterBase: IRouteProvider = {
    addRoutePath: function (path: string, callback: RouteCallback): void {
        _routerSource.routerMap.addPath(path, callback);
    },
    addRouteRegex: function (id: string, reg: RegExp, callback: RouteCallback, priority: number): void {
        _routerSource.routerMap.addRegex(id, reg, callback, priority);
    },
    removeRoutePath: function (path: string): void {
        _routerSource.routerMap.removePath(path);
    },
    removeRouteRegex: function (id: string): void {
        _routerSource.routerMap.removeRegex(id);
    },
    jump: function (hash: string, rollback: boolean = true, id?: string): void {
        let formattedHash = hash;
        if (formattedHash.startsWith("#")) formattedHash = formattedHash.substring(1);
        if (formattedHash.startsWith("/")) formattedHash = formattedHash.substring(1);

        const oldHash = Router.getHash();
        if (oldHash === formattedHash) {
            return;
        }

        // handle history
        if (rollback) {
            // process router id
            // if not assign router id, to use a guid
            let routerId = id;
            if (!!!routerId) {
                routerId = guid();
            } else if (_routerHistory.historyIds.includes(routerId)) {
                // if router id duplicates, to add a time flag
                routerId = `${routerId}_${Date.now()}`;
            }
            if (_routerHistory.current !== _routerHistory.histories.length - 1) {
                // in this case, the current router is not the lastest
                // should remove the the routers after current router before push new router
                const newHistories: string[] = [];
                const newHistoryIds: string[] = [];
                for (let i: number = 0; i <= _routerHistory.current; ++i) {
                    newHistories.push(_routerHistory.histories[i]);
                    newHistoryIds.push(_routerHistory.historyIds[i]);
                }
                _routerHistory.histories = newHistories;
                _routerHistory.historyIds = newHistoryIds;
            }
            _routerHistory.histories.push(formattedHash);
            _routerHistory.historyIds.push(routerId);
            _routerHistory.current = _routerHistory.histories.length - 1;
        }

        _setHashCode(formattedHash);
    },
    back: function (): void {
        if (_routerHistory.current > 0) {
            --_routerHistory.current;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    forward: function (): void {
        if (_routerHistory.current < _routerHistory.histories.length - 1) {
            ++_routerHistory.current;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    start: function (): void {
        if (0 !== _routerHistory.current) {
            _routerHistory.current = 0;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    end: function (): void {
        if (_routerHistory.histories.length - 1 !== _routerHistory.current) {
            _routerHistory.current = _routerHistory.histories.length - 1;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    go: function (target: number | string): void {
        let index = typeof target === "string" ? _routerHistory.historyIds.indexOf(target) : target;
        if (index >= 0 && index < _routerHistory.histories.length && index !== _routerHistory.current) {
            _routerHistory.current = index;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    move: function (delta: number): void {
        const index = _routerHistory.current + delta;
        if (index >= 0 && index < _routerHistory.histories.length && index !== _routerHistory.current) {
            _routerHistory.current = index;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    history: function (): string[] {
        const result: string[] = [];
        for (const router of _routerHistory.historyIds) {
            result.push(router);
        }

        return result;
    },
    current: function (): string {
        return _routerHistory.historyIds[_routerHistory.current];
    },
    length: function (): number {
        return _routerHistory.histories.length;
    },
};

class RouterInvalidTargetException extends Exception {
    public constructor(elementName: string) {
        super(elementName);
    }

    public override toString(): string {
        return `指定的HTML元素 - ${this.message} - 无法访问`;
    }
}

// ############################################
// Router Export API
// ############################################
export class Router {
    private static isValid: boolean = false;

    public static init(): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        if (!!!tianyuShell.core?.runtime) {
            tianyuShell.core.runtime = {};
        }

        if (!!!tianyuShell.core.runtime.router || !Router.isValid) {
            tianyuShell.core.runtime.router = RouterBase;
            const onhashChangedEvent = tianyuShell.core.event.onhashChanged;
            // onhashChangedEvent.listen("tianyushell_router", fnRouterHashChanged);
            onhashChangedEvent.listen("tianyushell_router", _routerSource.routerMap.route.bind(_routerSource.routerMap));

            Router.isValid = true;
        }

        // to handle the first page
        _routerHistory.current = 0;
        _routerHistory.histories.push(Router.getHash());
        _routerHistory.historyIds.push(TianyuShellRouterHomePage);
    }

    public static forceRegex(force: boolean): void {
        _routerSource.routerMap.forceRegex(force);
    }

    public static setFail(callback: RouteCallback): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        if (!!!Router.isValid) {
            throw new TianyuShellNotInitialException("tianyushell_router");
        }

        _routerSource.routerMap.setRouteFail(callback);
    }

    public static resetFail(): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        if (!!!Router.isValid) {
            throw new TianyuShellNotInitialException("tianyushell_router");
        }

        _routerSource.routerMap.resetRouteFail();
    }

    public static addPath(path: string, callback: RouteCallback): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        if (!!!Router.isValid) {
            throw new TianyuShellNotInitialException("tianyushell_router");
        }

        RouterBase.addRoutePath(path, callback);
    }

    public static addRegex(id: string, reg: RegExp, callback: RouteCallback, priority: number): void {
        if (!validateTianyuShellCore()) {
            throw new TianyuShellLostException(TianyuShellCoreLost);
        }

        if (!!!Router.isValid) {
            throw new TianyuShellNotInitialException("tianyushell_router");
        }

        RouterBase.addRouteRegex(id, reg, callback, priority);
    }

    public static getHash(): string {
        const hash = (window.location.hash as string).substring(1);
        return hash;
    }

    public static jump(hash: string, rollback?: boolean): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.jump(hash, rollback);
            return;
        }

        // if Router is not valid
        // use this logic to jump directly
        let formattedHash = hash;
        if (formattedHash.startsWith("#")) formattedHash = formattedHash.substring(1);
        if (formattedHash.startsWith("/")) formattedHash = formattedHash.substring(1);

        const oldHash = Router.getHash();
        if (oldHash === formattedHash) {
            return;
        }

        window.location.hash = `#${formattedHash}`;
    }

    public static back(): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.back();
            return;
        }

        history.back();
    }

    public static forward(): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.forward();
            return;
        }

        history.forward();
    }

    public static start(): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.start();
            return;
        }
    }

    public static end(): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.end();
            return;
        }
    }

    public static go(target: number | string): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.go(target);
            return;
        }
    }

    public static move(delta: number): void {
        if (validateTianyuShellCore() && Router.isValid) {
            RouterBase.go(delta);
            return;
        }

        history.go(delta);
    }

    public static getHistory(): string[] {
        if (validateTianyuShellCore() && Router.isValid) {
            return RouterBase.history();
        }

        return [];
    }

    public current(): string {
        if (validateTianyuShellCore() && Router.isValid) {
            return RouterBase.current();
        }

        return "";
    }
    public length(): number {
        if (validateTianyuShellCore() && Router.isValid) {
            return RouterBase.length();
        }

        return history.length;
    }
}
