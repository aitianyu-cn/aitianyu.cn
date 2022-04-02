/**@format */

export enum LogType {
    LOG,
    INFO,
    WARN,
    ERROR,
}

export class Log {
    public log(msg?: string): void {
        this._ConsoleOutput(LogType.LOG, msg);
    }
    public info(msg?: string): void {
        this._ConsoleOutput(LogType.INFO, msg);
    }
    public warn(msg?: string): void {
        this._ConsoleOutput(LogType.WARN, msg);
    }
    public error(msg?: string): void {
        this._ConsoleOutput(LogType.ERROR, msg);
    }

    public msg(logType: LogType, msg?: string): void {
        this._ConsoleOutput(logType, msg);
    }

    private _ConsoleOutput(logType: LogType, msg?: string): void {
        const datetime: Date = new Date();
        const formattedMsg = `[${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}] ${msg}`;
        switch (logType) {
            case LogType.WARN:
                console.warn(formattedMsg);
                break;
            case LogType.ERROR:
                console.error(formattedMsg);
                break;
            case LogType.LOG:
                console.log(formattedMsg);
                break;
            case LogType.INFO:
            default:
                console.info(formattedMsg);
                break;
        }
    }
}
