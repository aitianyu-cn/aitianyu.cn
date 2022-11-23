/**@format */

import { IProjectDownloadBinary, IProjectDownloadBinarySource, IProjectDownload } from "tianyu-server/model/Project.model";

export function parseProjectDownload(downloadSource: any): IProjectDownload | null {
    if (downloadSource) {
        try {
            const downloadItem: IProjectDownload = {
                desc: decodeURI(downloadSource.desc || ""),
                github: downloadSource.github,
                key: downloadSource.key,
                name: decodeURI(downloadSource.name || ""),
                project: downloadSource.project,
                binary: {},
            };

            for (const binarySourceKey of Object.keys(downloadSource.binary || {})) {
                const binarySourceValue = downloadSource.binary[binarySourceKey];

                const binarySource: IProjectDownloadBinary = {
                    name: decodeURI(binarySourceValue.name || ""),
                    source: [],
                };

                if (!!binarySource.name) {
                    for (const binarySourceValueItemSource of binarySourceValue.source) {
                        const binarySourceValueItem: IProjectDownloadBinarySource = {
                            address: binarySourceValueItemSource.address || "web",
                            name: decodeURI(binarySourceValueItemSource.name || ""),
                            url: binarySourceValueItemSource.url || "",
                        };

                        if (!!binarySourceValueItem.name && !!binarySourceValueItem.url) {
                            binarySource.source.push(binarySourceValueItem);
                        }
                    }

                    downloadItem.binary[binarySource.name] = binarySource;
                }
            }

            if (!!downloadItem.name) return downloadItem;
        } catch {
            //
        }
    }

    return null;
}
