/**@format */

export interface IProjectStyle {
    color: string;
    fontColor: string;
}

export interface IProject {
    key: string;
    name: string;
    desc: string;
    github: string;
    repo: string;
    style: IProjectStyle;
}

export interface IBinarySource {
    name: string;
    url: string;
}

export interface IBinaries {
    [platform: string]: IBinarySource[];
}

export interface IDownload {
    key: string;
    name: string;
    github: string;
    bin: IBinaries;
}
