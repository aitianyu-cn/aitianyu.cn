/**@format */

export enum Environment {
    DEVELOP,
    DEBUG,
    RELEASE,
}

export function getEnvironmentFromString(envirString?: string): Environment {
    const lowCase: string = envirString ? envirString.toLowerCase() : "dev";

    switch (lowCase) {
        case "debug":
            return Environment.DEBUG;
        case "release":
            return Environment.RELEASE;
        default:
            return Environment.DEVELOP;
    }
}
