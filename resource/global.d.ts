/**@format */

interface ILogLevel {
    value: number;
    name: string;
}

interface ILog {
    log(msg: string, level?: LogLevel, timer?: boolean): void;
    info(msg: string, timer?: boolean): void;
    warn(msg: string, timer?: boolean): void;
    debug(msg: string, timer?: boolean): void;
    error(msg: string, timer?: boolean): void;
    fatal(msg: string, timer?: boolean): void;
}

interface IPerformanceCapture {
    clean(): Promise<void>;
    addCallback(callback: PerfCaptureCallback): void;
    start(classify: string, id: string): ICaptureRecorder;
    end(recorder: ICaptureRecorder): void;
    saveToFile(fileName: string): void;
}

interface ITianyuShellCorePerformance {
    forceLog: boolean;
    logLevel: MapOfType<ILogLevel>;
    log: ILog;
    capture: IPerformanceCapture;

    startPerf(id?: string): IPerfRecorder;
    endPerf(recorder: IPerfRecorder, console?: boolean): number;
}

interface ITianyuShellCoreEvent {
    listen(listener: string, callback: CallbackAction): void;
    removeListen(listener: string): void;
    contains(listener: string): boolean;
}

interface ITianyuShellCoreEvents {
    onLoaded: ITianyuShellCoreEvent;
    onhashChanged: ITianyuShellCoreEvent;
}

interface ITianyuShellFeatureToggle {
    addFeature: (featureName: string) => void;
    addStoreFeatures: (features: IFeature[]) => void;
    allFeatures: () => MapOfBoolean;
    enable: (featureName: string, enableDepFeatures?: boolean) => void;
    disable: (featureName: string, disableDepFeatures?: boolean) => void;
    isActive: (featureName: string) => boolean;
    contains: (featureName: string) => boolean;
    loadFeatures: (features: FeatureSourceList) => void;
}

interface ITianyuShellLanguage {
    set: (language: AreaCode, callback?: CallbackAction | undefined, eventSync?: boolean | undefined) => void;
    get: () => AreaCode;
    addListener: (listener: string, callback: CallbackActionT<AreaCode>) => void;
    removeListener: (listener: string) => void;
    supportLanguage: string[];
}

type TianyuShellUIThemeColor = "light" | "dark";

interface ITianyuShellCoreUIThemeCustom {
    get(): string[];
    load(url: string, id: string): void;
    contains(id: string): boolean;
    remove(id: string): void;
}

interface ITianyuShellCoreUIThemeItem {
    theme: string;
    color: TianyuShellUIThemeColor;
    valid: boolean;
}

interface ITianyuShellCoreUITheme {
    default: ITianyuShellCoreUIThemeItem;
    custom: ITianyuShellCoreUIThemeItem;
    user: ITianyuShellCoreUIThemeCustom;
    change(theme: string, color: TianyuShellUIThemeColor): void;
    reset(): void;
}

interface ITianyuShellUI {
    background?: any;
    dialog?: any;
    major?: any;
    message?: any;
    theme: ITianyuShellCoreUITheme;
}

type StorageTypes = string | boolean | number | object | null | Function;

interface IStorage {}

interface ITianyuShellStorage {
    set(path: string | string[], key: string, value: StorageTypes, snapshot?: boolean): void;
    get(path: string | string[], key: string): StorageTypes;
    add(path: string | string[], key: string, value: StorageTypes, snapshot?: boolean): void;
    del(path: string | string[], key: string, snapshot?: boolean): StorageTypes;
    clone(path: string | string[]): IStorage;
    dispose(storage: IStorage): void;

    current(): string;
    back(): string;
    forward(): string;
    count(): number;
}

interface IRouteProvider {
    addRoutePath(path: string, callback: RouteCallback): void;
    addRouteRegex(id: string, reg: RegExp, callback: RouteCallback, priority: number): void;
    jump(hash: string, rollback: boolean = true, id?: string): void;
    back(): void;
    forward(): void;
    start(): void;
    end(): void;
    go(target: number | string): void;
    move(delta: number): void;
    history(): string[];
    current(): string;
    length(): number;
}

interface ITianyuShellCoreRuntime {
    router?: IRouteProvider;
    console?: boolean;
    environment?: string;
}

interface ITianyuShellCoreCacheStatic {
    load(name: string): Promise<any>;
    unload(name: string): void;
    get(name: string): any;
    contains(name: string): boolean;
}

interface ITianyuShellCoreCache {
    static: ITianyuShellCoreCacheStatic;
}

interface ITianyuShellCore {
    cookie: ITianyuShellCookie;
    cache: ITianyuShellCoreCache;
    event: ITianyuShellCoreEvents;
    language?: ITianyuShellLanguage;
    performance?: ITianyuShellCorePerformance;
    runtime?: ITianyuShellCoreRuntime;
    featureToggle?: ITianyuShellFeatureToggle;
    ui?: ITianyuShellUI;
    storage?: ITianyuShellStorage;
}

interface ITianyuShellCookie {
    set(key: string, value: string, domain?: string, path?: string, expires?: Date, escaped?: boolean): void;
    get(key: string, notFound: string = ""): string;
    remove(key: string, path?: string, domain?: string): void;
}

interface ITianyuShell {
    prototype: ITianyuShell;
    new (): ITianyuShell;
    core: ITianyuShellCore;
}

declare const tianyuShell: ITianyuShell;
