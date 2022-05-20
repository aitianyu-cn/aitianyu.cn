/**@format */

import { AreaListener, TriggerList } from "src/ListenerList";
import { IMsgBundle } from "../i18n/MsgBundle";
import { AreaCode } from "./AreaCode";
import { getAreaFromString, getLocationArea } from "./AreaHelper";
import { FeatureToggle } from "./FeatureToggle";
import { LogState } from "./LogState";

export interface ITriggerData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: string | any;
    sender?: any;
    msgBundle?: IMsgBundle;
}

export type fnConfigureTrigger = (data: ITriggerData) => void;

export type fnAreaTrigger = (area: AreaCode) => void;

interface ITriggers<trigger_method> {
    [triggerTarget: string]: trigger_method;
}

export class Configure {
    private static configObject: Configure | null = null;

    private _Area: AreaCode;

    private _AreaTrigger: ITriggers<fnAreaTrigger>;
    private _GeneralTrigger: ITriggers<fnConfigureTrigger>;

    private constructor() {
        this._Area = (localStorage["language"] && getAreaFromString(localStorage["language"])) || getLocationArea();

        this._AreaTrigger = {};
        this._GeneralTrigger = {};
    }

    public getArea(): AreaCode {
        return this._Area;
    }
    public setArea(area: string, forceFire = false): void {
        const areaCode = getAreaFromString(area);

        let setArea = false;
        if (this._Area !== areaCode) {
            setArea = true;
            this._Area = areaCode;
            localStorage["language"] = area;
        }

        if (!setArea && !forceFire) {
            return;
        }

        for (const listener of Object.keys(this._AreaTrigger)) {
            this._AreaTrigger[listener](this._Area);
        }

        Configure.windowConsoleLog(`Configure: Area is set ${area}`, LogState.Info);
    }
    public listenArea(listener: string, trigger: fnAreaTrigger): void {
        if (!AreaListener[listener]?.available) {
            return;
        }
        this._AreaTrigger[listener] = trigger;

        Configure.windowConsoleLog(`Configure: new area listener - ${listener}`, LogState.Info);
    }
    public notListenArea(listener: string): void {
        if (this._AreaTrigger[listener]) {
            delete this._AreaTrigger[listener];
        }
        Configure.windowConsoleLog(`Configure: area listener - ${listener} removed`, LogState.Info);
    }

    public addTrigger(triggerName: string, trigger: fnConfigureTrigger): void {
        if (!TriggerList[triggerName]?.available) {
            return;
        }
        this._GeneralTrigger[triggerName] = trigger;

        Configure.windowConsoleLog(`Configure: add a trigger - ${triggerName}`, LogState.Info);
    }
    public removeTrigger(triggerName: string): void {
        if (this._GeneralTrigger[triggerName]) {
            delete this._GeneralTrigger[triggerName];

            Configure.windowConsoleLog(`Configure: remove a trigger - ${triggerName}`, LogState.Info);
        }
    }
    public trigger(triggerName: string, data: ITriggerData): void {
        if (this._GeneralTrigger[triggerName]) {
            this._GeneralTrigger[triggerName](data);
        }
        Configure.windowConsoleLog(`Configure: fire a trigger - ${triggerName} with ${data.obj}`, LogState.Info);
    }

    public static generateConfigure(): Configure {
        if (!Configure.configObject) {
            Configure.configObject = new Configure();
        }

        return Configure.configObject;
    }

    public static initConfigure(): void {
        if (!Configure.configObject) {
            Configure.configObject = new Configure();
        }
    }

    private static windowConsoleLog(logMsg: string, logState: LogState): void {
        if (!FeatureToggle.isActive("AITIANYU_CN_WEB_DEBUG_LOG")) {
            return;
        }

        switch (logState) {
            case LogState.Log:
                console.log(logMsg);
                break;
            case LogState.Error:
                console.error(logMsg);
                break;
            case LogState.Warn:
                console.warn(logMsg);
                break;
            default:
                console.info(logMsg);
                break;
        }
    }
}
