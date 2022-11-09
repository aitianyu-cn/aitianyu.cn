/**@format */

import { MapOfType } from "ts-core/Types";

const _cache: MapOfType<any> = {};

export class CacheController {
    public static cache(key: string, value: any): void {
        _cache[key] = value;
    }

    public static get(key: string): any {
        return _cache[key];
    }

    public static remove(key: string): void {
        if (typeof _cache[key] !== "undefined") {
            delete _cache[key];
        }
    }
}
