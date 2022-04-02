/**@format */

import { AreaCode } from "../AreaCode";
import { getAreaFromString } from "../AreaHelper";
import { Environment, getEnvironmentFromString } from "../Environment";
import { Version } from "./Version";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StaticConfigJson = require("aitianyu-config/config.json");

export class Configure {
    private static configObject: Configure | null = null;

    private _Version: Version;
    private _Area: AreaCode;
    private _Environment: Environment;

    private constructor() {
        this._Version = new Version(StaticConfigJson?.version || "0.0.1");
        this._Area = getAreaFromString(StaticConfigJson.language);
        this._Environment = getEnvironmentFromString(StaticConfigJson.runtime);
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

    public static generateConfigure(): Configure {
        if (Configure.configObject) {
            return Configure.configObject;
        }

        const newConfigure: Configure = new Configure();
        Configure.configObject = newConfigure;

        return newConfigure;
    }
}
