/**@format */

import { AreaCode } from "dty-common/AreaCode";
import { getAreaFromString } from "dty-common/AreaHelper";
import { EventAdapter, IEventListener } from "dty-common/core/Events";
import { Environment, getEnvironmentFromString } from "dty-common/Environment";
import { Version } from "./Version";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StaticConfigJson = require("dty-config/config.json");

export class Configure {
    private static configObject: Configure | null = null;

    private _Version: Version;
    private _Area: AreaCode;
    private _Environment: Environment;

    private _AreaListener: EventAdapter<AreaCode>;

    private constructor() {
        this._Version = new Version(StaticConfigJson?.version || "0.0.1");
        this._Area = getAreaFromString(StaticConfigJson.language);
        this._Environment = getEnvironmentFromString(StaticConfigJson.runtime);

        this._AreaListener = new EventAdapter<AreaCode>();
    }

    public getVersion(): Version {
        return this._Version;
    }
    public getArea(): AreaCode {
        return this._Area;
    }
    public getEnvironment(): Environment {
        return this._Environment;
    }

    public setArea(area: AreaCode): void {
        if (this._Area != area) {
            this._Area = area;
            this._AreaListener.fireEventsAsync(area);
        }
    }

    public listenArea(listener: string, listenerInstance: IEventListener<AreaCode>): void {
        this._AreaListener.addListener(listener, listenerInstance);
    }
    public notListenArea(listener: string): void {
        this._AreaListener.removeListener(listener);
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
