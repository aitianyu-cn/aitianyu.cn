/**@format */

import { MapOfType } from "ts-core/Types";

export interface IAllProjectItem {
    desc: string;
    github: string;
    key: string;
    name: string;
    project: string;
}

export interface IProjectDownloadBinarySource {
    address: "web" | "inner";
    name: string;
    url: string;
}

export interface IProjectDownloadBinary {
    name: string;
    source: IProjectDownloadBinarySource[];
}

export interface IProjectDownload {
    project: string;
    name: string;
    key: string;
    github: string;
    desc: string;
    binary: MapOfType<IProjectDownloadBinary>;
}

export interface IProjectDocumentOption {
    name: string;
    target: string;
}

export interface IProjectDocument {
    desc: string;
    key: string;
    name: string;
    project: string;
    options: IProjectDocumentOption[];
}
