/**@format */

export interface IHelpMainfestFile {
    file: string;
    i18n: string;
}

export interface IHelpMainfestFiles {
    [key: string]: IHelpMainfestFile;
}

export interface IHelpMainfest {
    default: string;
    pdf: string;
    files: IHelpMainfestFiles;
}
