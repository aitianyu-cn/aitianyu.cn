/**@format */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LogState } from "../core/LogState";
import { ConsoleLog } from "../LogHelper";

export interface IStorageContentItem {
    flag: boolean;
    timeStamp: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

interface IStorageContent {
    [key: string]: IStorageContentItem;
}

export interface IStorageWatchDog {
    startWatchDog(): void;
    endWatchDog(): void;
}

export interface IStorage {
    setValue(key: string, content: any, forceTimestamp?: boolean): void;
    getValue(key: string): any;
    delValue(key: string): void;
    count(): number;
    containsKey(key: string): boolean;

    updateStamp(key: string): void;
}

const DefaultStorageWatchDogTimer = 300000;
// const DefaultStorageWatchDogTimer = 30000;

export class Storage implements IStorage, IStorageWatchDog {
    private oContent: IStorageContent;

    private iTimer: number;

    public constructor() {
        this.oContent = {};

        this.iTimer = 0;
    }

    public setValue(key: string, content: any, forceTimestamp = false): void {
        this.oContent[key] = {
            flag: true,
            timeStamp: forceTimestamp ? Date.now() : -1,
            data: content,
        };
    }

    public getValue(key: string): any {
        if (this.oContent[key]) {
            this.oContent[key].flag = true;
            this.oContent[key].timeStamp = this.oContent[key].timeStamp === -1 ? -1 : Date.now();

            return this.oContent[key].data;
        }

        return null;
    }

    public delValue(key: string): void {
        if (this.oContent[key]) {
            delete this.oContent[key];
        }
    }

    public count(): number {
        return Object.keys(this.oContent).length;
    }

    public containsKey(key: string): boolean {
        return !!this.oContent[key];
    }

    public updateStamp(key: string): void {
        if (this.oContent[key]) {
            this.oContent[key].flag = true;
            this.oContent[key].timeStamp = this.oContent[key].timeStamp === -1 ? -1 : Date.now();
        }
    }

    public startWatchDog(): void {
        ConsoleLog("Storage Watch Dog Start", LogState.Warn);

        this.endWatchDog();

        this.iTimer = window.setInterval(this.watchDog.bind(this), DefaultStorageWatchDogTimer);
    }

    public endWatchDog(): void {
        if (this.iTimer) {
            ConsoleLog("Storage Watch Dog End", LogState.Warn);

            window.clearInterval(this.iTimer);
        }
    }

    private watchDog(): void {
        ConsoleLog("Storage Watch Dog Invoked", LogState.Warn);

        const keys = Object.keys(this.oContent);

        const aCleanList: string[] = [];
        for (const key of keys) {
            const value = this.oContent[key];
            if (value.timeStamp === -1) {
                continue;
            }

            if (!value.flag) {
                aCleanList.push(key);
            }

            const timeSpan = Date.now() - value.timeStamp;
            if (timeSpan > DefaultStorageWatchDogTimer) {
                value.flag = false;
            }
        }

        for (const key of aCleanList) {
            delete this.oContent[key];
        }
    }
}
