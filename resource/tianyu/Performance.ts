/**@format */

import { guid } from "ts-core/Guid";
import { ICaptureRecorder, IPerfRecorder, LogLevel, MapOfType, PerfCaptureCallback } from "ts-core/Types";

// declare const window: any;

export {};

const _LogLevel: MapOfType<ILogLevel> = {
    DEBUG: { value: 0, name: "DEBUG" },
    ERROR: { value: 3, name: "ERROR" },
    FATAL: { value: 4, name: "FATAL" },
    INFO: { value: 1, name: "INFO" },
    WARNING: { value: 2, name: "WARNING" },
    LOG: { value: -1, name: "LOG" },
};

const _isConsoleEnabled = function (): boolean {
    const runtimeEnabled = !!tianyuShell.core.runtime?.console;
    const consoleFeatureToggle = !!tianyuShell.core.featureToggle?.isActive("TIANYU_SHELL_CONSOLE_LOG");
    const forceLog = !!tianyuShell.core.performance?.forceLog;

    return runtimeEnabled || consoleFeatureToggle || forceLog;
};

const _consoleLog = function (level: ILogLevel, msg: string, timer: boolean): void {
    const isConsoleEnable = _isConsoleEnabled();
    if (!isConsoleEnable) {
        return;
    }

    if (level.value >= 100) {
        console.log(`[${level.name}] ${msg}`);
        return;
    }

    let timeString = "";
    if (timer) {
        const date = new Date(Date.now());
        const millisecondString = date.getMilliseconds().toString();
        timeString = `[${date.toLocaleTimeString()}.${millisecondString.substring(
            0,
            millisecondString.length > 3 ? 3 : millisecondString.length,
        )}]`;
    }
    const logMessage = `[${level.name}] ${timeString} ${msg}`;
    switch (level.value) {
        case 0:
            console.debug(logMessage);
            break;
        case 1:
            console.info(logMessage);
            break;
        case 2:
            console.warn(logMessage);
            break;
        case 3:
            console.error(logMessage);
            break;
        case 4:
            console.error(logMessage);
            break;
        default:
            console.log(msg);
            break;
    }
};

const Log: ILog = {
    log: function (msg: string, level?: LogLevel, timer?: boolean): void {
        const logLevel: LogLevel = level ?? LogLevel.INFO;
        switch (logLevel) {
            case LogLevel.DEBUG:
                _consoleLog(_LogLevel["DEBUG"], msg, !!timer);
                break;
            case LogLevel.WARNING:
                _consoleLog(_LogLevel["WARNING"], msg, !!timer);
                break;
            case LogLevel.ERROR:
                _consoleLog(_LogLevel["ERROR"], msg, !!timer);
                break;
            case LogLevel.FATAL:
                _consoleLog(_LogLevel["FATAL"], msg, !!timer);
                break;
            case LogLevel.INFO:
                _consoleLog(_LogLevel["INFO"], msg, !!timer);
                break;
            default:
                _consoleLog(_LogLevel["LOG"], msg, !!timer);
                break;
        }
    },
    info: function (msg: string, timer?: boolean): void {
        _consoleLog(_LogLevel["INFO"], msg, !!timer);
    },
    warn: function (msg: string, timer?: boolean): void {
        _consoleLog(_LogLevel["WARNING"], msg, !!timer);
    },
    debug: function (msg: string, timer?: boolean): void {
        _consoleLog(_LogLevel["DEBUG"], msg, !!timer);
    },
    error: function (msg: string, timer?: boolean): void {
        _consoleLog(_LogLevel["ERROR"], msg, !!timer);
    },
    fatal: function (msg: string, timer?: boolean): void {
        _consoleLog(_LogLevel["FATAL"], msg, !!timer);
    },
};

interface ICaptureRecordItem {
    classify: string;
    id: string;
    cid: number;
    start: number;
    end: number;
}

type ICaptureCIItem = MapOfType<number>;

interface ICapturePrintSegment {
    start: number;
    end: number;
    during: number;
}

interface ICapturePrintItem {
    name: string;
    segments: ICapturePrintSegment;
}

class CaptureContainer {
    private baseTime: number;
    private captureList: ICaptureRecordItem[];
    private captureCI: MapOfType<ICaptureCIItem>;
    private capturePromises: Promise<void>[];

    private callback: PerfCaptureCallback | null;

    public constructor() {
        this.baseTime = Date.now();
        this.captureList = [];
        this.captureCI = {};
        this.capturePromises = [];

        this.callback = null;
    }

    public async clean(): Promise<void> {
        return new Promise<void>((resolve) => {
            Promise.all(this.capturePromises)
                .finally(() => {
                    this.baseTime = Date.now();
                    this.captureList = [];
                    this.captureCI = {};
                    this.capturePromises = [];
                })
                .finally(resolve);
        });
    }

    public addCallback(callback: PerfCaptureCallback): void {
        this.callback = callback;
    }

    public start(classify: string, id: string): ICaptureRecorder {
        if (!!!id || !!!classify) {
            throw new Error("Performace Capture cannot handle when the id or classification is empty or null");
        }

        if (!Object.keys(this.captureCI).includes(classify)) {
            this.captureCI[classify] = {};
        }

        if (!Object.keys(this.captureCI[classify]).includes(id)) {
            this.captureCI[classify][id] = 0;
        }

        const cId = this.captureCI[classify][id]++;
        let fnFinishCall = () => {};
        this.capturePromises.push(
            new Promise<void>((resolve) => {
                fnFinishCall = resolve;
            }),
        );
        const listItem: ICaptureRecordItem = {
            classify: classify,
            id: id,
            cid: cId,
            start: Date.now(),
            end: -1,
        };

        const lIndex = this.captureList.push(listItem);

        if (this.callback) {
            const cidMsg = cId === 0 ? "" : ` (${cId})`;
            const captureMsg = `${classify} - ${id}${cidMsg}`;
            this.callback("START", captureMsg, listItem.start);
        }

        return { index: lIndex, finish: fnFinishCall };
    }

    public end(recorder: ICaptureRecorder): void {
        if (this.captureList.length < recorder.index) {
            throw new Error("Cannot find the specified recorder, the recorder is not addressable.");
        }

        const item: ICaptureRecordItem = this.captureList[recorder.index - 1];
        item.end = Date.now();

        if (this.callback) {
            const cidMsg = item.cid === 0 ? "" : ` (${item.cid})`;
            const captureMsg = `${item.classify} - ${item.id}${cidMsg}`;
            this.callback("END", captureMsg, item.end);
        }

        recorder.finish();
    }

    public saveToFile(fileName: string): void {
        const printList: ICapturePrintItem[] = [];

        for (const item of this.captureList) {
            const cidMsg = item.cid === 0 ? "" : ` (${item.cid})`;
            const captureName = `${item.classify} - ${item.id}${cidMsg}`;
            printList.push({
                name: captureName,
                segments: {
                    start: item.start,
                    end: item.end,
                    during: item.end - item.start,
                },
            });
        }

        const result = JSON.stringify({
            config: {
                baseTime: this.baseTime,
            },
            trace: printList,
        });
        this.downloadFile(fileName, result);
    }

    private downloadFile(fileName: string, content: any): void {
        const link = document.createElement("a");
        if (typeof Blob !== "undefined") {
            const file = new Blob([content], { type: "text/plain" });
            link.href = URL.createObjectURL(file);
            link.download = `${fileName}.json`;
            link.click();
        }
    }
}

const _captureContainer = new CaptureContainer();

const Capture = {
    clean: async function (): Promise<void> {
        return _captureContainer.clean();
    },
    addCallback: function (callback: PerfCaptureCallback): void {
        _captureContainer.addCallback(callback);
    },
    start: function (classify: string, id: string): ICaptureRecorder {
        return _captureContainer.start(classify, id);
    },
    end: function (recorder: ICaptureRecorder): void {
        _captureContainer.end(recorder);
    },
    saveToFile: function (fileName: string): void {
        _captureContainer.saveToFile(fileName);
    },
};

const Performance = {
    forceLog: false,

    logLevel: _LogLevel,
    log: Log,
    capture: Capture,

    startPerf: function (id?: string): IPerfRecorder {
        return {
            id: id || guid(),
            start: Date.now(),
        };
    },
    endPerf: function (recorder: IPerfRecorder, console?: boolean): number {
        const perfTime = Date.now() - recorder.start;

        if (console) {
            const consoleString = `[${recorder.id}] perf time - ${perfTime}`;
            _consoleLog({ value: 100, name: "Performance" }, consoleString, false);
        }

        return perfTime;
    },
};

function initiation(): void {
    tianyuShell.core.performance = Performance;
}

initiation();
