/**@format */

import { MapOfType } from "@aitianyu.cn/server-base";

export type GitSourcePerUserPeriod = "day" | "week" | "month" | "quarter" | "half-year" | "year";

export interface IGitSourceRepo {
    ssh: boolean;
    remote: string;
    excludes: string[];
}

export interface IGitSourcePerUser {
    period: GitSourcePerUserPeriod | null;
    excludes: string[];

    repos: MapOfType<IGitSourceRepo>;
}

export interface IGitSourceResponse {
    valid: boolean;
    publicPath: string;
    sources: MapOfType<IGitSourcePerUser>;
}
