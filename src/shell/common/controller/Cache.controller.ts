/**@format */

import { MapOfType } from "ts-core/Types";

interface ICacheItem {
    timestamp: number;
    data: any;
}

const _cache: MapOfType<ICacheItem> = {};

export class CacheController {
    public static cache(key: string, value: any): void {
        _cache[key] = { timestamp: Date.now(), data: value };
    }

    public static get(key: string): any {
        const value = _cache[key];
        if (!!!value) return null;

        const valid = Date.now() - value.timestamp;
        if (valid > 300000) {
            delete _cache[key];
            return null;
        }
        return value.data;
    }

    public static remove(key: string): void {
        if (typeof _cache[key] !== "undefined") {
            delete _cache[key];
        }
    }
}
