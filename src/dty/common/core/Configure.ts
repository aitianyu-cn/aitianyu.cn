/**@format */

import { AreaCode } from "../AreaCode";
import { getAreaFromString, getLocationArea } from "../AreaHelper";
import { EventAdapter, IEventListener } from "../model/Events";
import { Environment, getEnvironmentFromString } from "../Environment";
import { Version } from "../model/Version";
import { IMessageBundle } from "../model/IMessageBundle";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StaticConfigJson = require("../../config/config.json");

export interface ITriggerData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: string | any;
    msgBundle?: IMessageBundle;
}

interface ITriggers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: IEventListener<ITriggerData>;
}
export class Configure {
    private static configObject: Configure | null = null;

    private _Version: Version;
    private _Area: AreaCode;
    private _Environment: Environment;

    private _AreaListener: EventAdapter<AreaCode>;

    private _Triggers: ITriggers;

    private constructor() {
        this._Version = new Version(StaticConfigJson?.version || "0.0.1");
        this._Area = (localStorage["language"] && getAreaFromString(localStorage["language"])) || getLocationArea();
        this._Environment = getEnvironmentFromString(StaticConfigJson.runtime);

        this._AreaListener = new EventAdapter<AreaCode>();
        this._Triggers = {};
    }

    public getVersion(): Version {
        return this._Version;
    }
    public getArea(): AreaCode {
        if (localStorage["language"]) {
            return getAreaFromString(localStorage["language"]);
        }

        return this._Area;
    }
    public getEnvironment(): Environment {
        return this._Environment;
    }

    public setArea(area: string, forceFire = false): void {
        const areaCode = getAreaFromString(area);

        let setArea = false;
        if (this._Area != areaCode) {
            setArea = true;
            this._Area = areaCode;
            localStorage["language"] = area;
        }

        if (setArea || forceFire) {
            this._AreaListener.fireEventsAsync(areaCode);
        }
    }

    public listenArea(listener: string, listenerInstance: IEventListener<AreaCode>): void {
        this._AreaListener.addListener(listener, listenerInstance);
    }
    public notListenArea(listener: string): void {
        this._AreaListener.removeListener(listener);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public addTrigger(triggerName: string, triggerInstance: IEventListener<ITriggerData>): void {
        if (this._Triggers[triggerName]) {
            this._Triggers[triggerName].removed();
        }
        this._Triggers[triggerName] = triggerInstance;
    }
    public removeTrigger(triggerName: string): void {
        if (this._Triggers[triggerName]) {
            delete this._Triggers[triggerName];
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public trigger(triggerName: string, eventString: ITriggerData, sender?: any): void {
        console.log("fired");
        this._Triggers[triggerName]?.fire(eventString, sender);
    }

    public static generateConfigure(): Configure {
        if (Configure.configObject) {
            return Configure.configObject;
        }

        const newConfigure: Configure = new Configure();
        Configure.configObject = newConfigure;

        return newConfigure;
    }
}
