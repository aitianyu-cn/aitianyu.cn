/**@format */

export interface IDownloadFrameProperty extends IReactProperty {}

export interface IDownloadBinarySource {
    name: string;
    url: string;
}

export interface IDownloadMagnetBinaries {
    [platform: string]: IDownloadBinarySource[];
}

export interface IDownloadMagnetItem {
    key: string;
    name: string;
    desc: string;
    bin: IDownloadMagnetBinaries;
    github: string;
}
