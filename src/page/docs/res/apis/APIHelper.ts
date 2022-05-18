/**@format */

export enum SelectedSourceLanguage {
    CPP,
    CS,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLanguageAPIs(selected: SelectedSourceLanguage): any {
    switch (selected) {
        case SelectedSourceLanguage.CS:
            return require("./csharp.json");
        case SelectedSourceLanguage.CPP:
        default:
            return require("./cpp.json");
    }
}
