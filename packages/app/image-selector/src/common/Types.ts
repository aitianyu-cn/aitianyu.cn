/**@format */

import { MapOfType } from "@aitianyu.cn/types";

export interface IImageRecorderItem {
    name: string;
    data: string;
}

export interface IImageRecorder {
    name: string;
    safe: string;
    images: MapOfType<IImageRecorderItem>;
    selected: string[];
}

export interface IImageGetList {
    valid: boolean;
    all: string[];
    selected: string[];
}

export interface IImageGets {
    name: string;
    image: string;
}
