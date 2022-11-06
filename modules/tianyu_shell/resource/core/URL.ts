/**@format */

import { MapOfString } from "./Types";

export type URLType = "Web" | "Path" | "Unknown";

interface URLItem {
    name: string;
    params: MapOfString;
}

export class URL {
    private protocol: string;
    private type: URLType;
    private origin: string;
    private paths: URLItem[];

    public constructor(url: string, type?: URLType) {
        this.protocol = "";
        this.origin = url;
        this.type = type || "Unknown";

        this.paths = [];

        this.processURL();
    }

    public getType(): URLType {
        return this.type;
    }

    public getProtocol(): string {
        return this.protocol;
    }

    public getOrigin(): string {
        return this.origin;
    }

    public getPurePath(): string {
        const aEntries: string[] = [];

        for (const item of this.paths) {
            aEntries.push(item.name);
        }

        return aEntries.join("/");
    }

    public getParam(path: string, key: string): string {
        const aQueryEntries: string[] = [];
        let temp: string = "";
        for (let i = 0; i < path.length; ++i) {
            if ((path[i] === "/" || path[i] === "\\") && !!temp) {
                aQueryEntries.push(temp);
                temp = "";
            } else {
                temp += path[i];
            }
        }
        if (!!temp) {
            aQueryEntries.push(temp);
        }

        if (!!!aQueryEntries.length) {
            return this.paths[0]?.params[key] || "";
        }

        let params: MapOfString | null;
        let i = 0;
        do {
            params = aQueryEntries[i] === (this.paths[i]?.name || "") ? this.paths[i].params : null;
        } while (i < aQueryEntries.length && !!params);

        return params?.[key] || "";
    }

    private processURL(): void {
        const aWebDetect = this.origin.split("://");
        const urlBody: string = aWebDetect.length === 1 ? aWebDetect[0] : aWebDetect[1];
        if (aWebDetect.length === 2) {
            if (!!aWebDetect[0] && !!urlBody) {
                this.protocol = aWebDetect[0];
                this.type = "Web";
            } else if (!!aWebDetect[1]) {
                this.type = "Unknown";
            }
        } else if (aWebDetect.length > 2) {
            this.type = "Unknown";
        } else {
            this.type = "Path";
        }

        this.processPath(urlBody);
    }

    private processPath(path: string): void {
        let entry: string = "";
        let params: MapOfString = {};

        let paramKey: string = "";
        let paramValue: string = "";

        let inParam: boolean = false;
        let inParamValue: boolean = false;

        for (let i = 0; i < path.length; ++i) {
            if ((path[i] === "/" || path[i] === "\\") && !!entry) {
                if (paramKey && paramValue) params[paramKey] = paramValue;

                this.paths.push({ name: entry, params: params });

                entry = "";
                params = {};

                paramKey = "";
                paramValue = "";

                inParam = false;
                inParamValue = false;
            } else if (path[i] === "?") inParam = true;
            else {
                if (inParam) {
                    if (path[i] === "=") {
                        if (inParamValue) paramValue += path[i];
                        else inParamValue = true;
                    } else if (path[i] === "&") {
                        // 进入下一个param
                        inParamValue = false;
                        if (paramKey && paramValue) params[paramKey] = paramValue;

                        paramKey = "";
                        paramValue = "";
                    }
                } else if (path[i] === "?") inParam = true;
                else entry += path[i];
            }
        }

        if (!!entry) {
            if (paramKey && paramValue) params[paramKey] = paramValue;
            this.paths.push({ name: entry, params: params });
        }
    }
}
