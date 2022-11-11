/**@format */

import { IStorage, IStorageWatchDog, InternalStorage } from "tianyu-shell/common/utilities/InternalStorage";
import { FeatureToggle } from "ts-core/FeatureToggle";

export interface ITriggerData {
    obj: string | any;
    sender?: any;
}

export type fnConfigureTrigger = (data: ITriggerData) => void;

interface ITriggers<trigger_method> {
    [triggerTarget: string]: trigger_method;
}

export class ConfigureController {
    private static configObject: ConfigureController | null = null;

    private _Storage: InternalStorage;

    private _GeneralTrigger: ITriggers<fnConfigureTrigger>;

    private constructor() {
        this._Storage = new InternalStorage();

        this._GeneralTrigger = {};
    }

    public getStorage(): IStorage {
        return this._Storage;
    }
    public getStorageDog(): IStorageWatchDog {
        return this._Storage;
    }

    public addTrigger(triggerName: string, trigger: fnConfigureTrigger): void {
        this._GeneralTrigger[triggerName] = trigger;

        tianyuShell.core.performance?.log.info(`Configure: add a trigger - ${triggerName}`);
    }
    public removeTrigger(triggerName: string): void {
        if (this._GeneralTrigger[triggerName]) {
            delete this._GeneralTrigger[triggerName];

            tianyuShell.core.performance?.log.info(`Configure: remove a trigger - ${triggerName}`);
        }
    }
    public trigger(triggerName: string, data: ITriggerData): void {
        if (this._GeneralTrigger[triggerName]) {
            this._GeneralTrigger[triggerName](data);
        }
        tianyuShell.core.performance?.log.info(`Configure: fire a trigger - ${triggerName} with ${data.obj}`);
    }

    public static generateConfigure(): ConfigureController {
        if (!ConfigureController.configObject) {
            ConfigureController.configObject = new ConfigureController();
        }

        return ConfigureController.configObject;
    }

    public static initConfigure(): void {
        if (!ConfigureController.configObject) {
            ConfigureController.configObject = new ConfigureController();
        }
    }
}
