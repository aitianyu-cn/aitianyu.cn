/**@format */

import { MapOfType } from "@aitianyu.cn/types";

export type GitSourcePerUserPeriod = "day" | "week" | "month" | "quarter" | "half-year" | "year";

export interface IGitSourceRepo {
    ssh: boolean;
    remote: string;
    excludes: string[];
}

export interface IGitSourcePerUser {
    period: GitSourcePerUserPeriod | null;
    excludes: string[];
    snapshot: boolean;

    repos: MapOfType<IGitSourceRepo>;
}

export interface IGitSourceResponse {
    valid: boolean;
    publicPath: string;
    sources: MapOfType<IGitSourcePerUser>;
}

export interface IGitRunningResult {
    times: string;
    result: boolean;
    message: string;
}

export interface IGetRunningResult extends IGitRunningResult {
    server: string;
}