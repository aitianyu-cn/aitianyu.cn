/**@format */

import React from "react";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { FetchFileLoader } from "ts-core/FileLoader";
import { emptyMsgBundle, IMessageBundle, require_msgbundle } from "ts-core/I18n";
import {
    IDownloadBinarySource,
    IDownloadFrameProperty,
    IDownloadMagnetBinaries,
    IDownloadMagnetItem,
} from "./DownloadFrame.model";
import { DownloadMagnet } from "./DownloadMagnet";
import "./css/main.css";
import { Language } from "ts-core/Language";
import { ReactWaiting } from "tianyu-shell/ui/react/widget/control/ReactWaiting";
import { AITIANYU_CN_OPERATION_SUCCESS, AITIANYU_CN_STATIC_FILE_SERVER } from "tianyu-server/Global";

const DOWNLOAD_BACKEND_DATA_SOURCE = "remote-project/aitianyu/cn/project/download/all";
const messageBundle = require_msgbundle("home", "app");

export class DownloadFrame extends React.Component<IDownloadFrameProperty, IReactState> {
    private isLoaded: boolean;
    private url: string;

    public constructor(props: IDownloadFrameProperty) {
        super(props);

        this.isLoaded = false;

        const production = tianyuShell.core.runtime?.environment === "production";
        const language = production ? Language.toString() : "zh_CN";
        this.url = `${DOWNLOAD_BACKEND_DATA_SOURCE}?lang=${language}`;

        document.title = messageBundle.getText("HOME_PAGE_DOWNLOAD_TITLE");
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        if (!!this.getReceiveData() && this.isLoaded) {
            return;
        }

        const cachedData = CacheController.get(this.url);
        const fileLoader = new FetchFileLoader(this.url);

        (cachedData ? Promise.resolve() : fileLoader.openAsync()).then((value: any) => {
            const source = fileLoader.getResponse();
            if (source["result"] === AITIANYU_CN_OPERATION_SUCCESS) {
                const responseData = source["response"];
                if (responseData) {
                    CacheController.cache(this.url, responseData);
                }
            }

            this.forceUpdate();
        });
    }

    public override componentWillUnmount(): void {
        this.isLoaded = false;
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (this.isLoaded) {
            super.forceUpdate(callback);
        }
    }

    public override render(): React.ReactNode {
        if (!!!this.getReceiveData()) {
            return this.renderLoading();
        }

        return this.renderLoaded();
    }

    private getReceiveData(): any {
        return CacheController.get(this.url);
    }

    private renderLoaded(): React.ReactNode {
        const aProjects = this.renderProjects();

        return (
            <div className="download_base">
                <div className="download_baseGrid">
                    <div className="download_replace download_replace_1"></div>
                    <div className="download_content">{aProjects.length === 0 ? this.renderEmpty() : aProjects}</div>
                    <div className="download_replace download_replace_2"></div>
                </div>
            </div>
        );
    }

    private renderLoading(): React.ReactNode {
        return (
            <div className="download_base">
                <div className="download_baseGrid">
                    <div className="download_replace download_replace_1"></div>
                    <div className="download_content">
                        <ReactWaiting />
                    </div>
                    <div className="download_replace download_replace_2"></div>
                </div>
            </div>
        );
    }

    private renderEmpty(): React.ReactNode {
        return (
            <div className="empty_download_outter">
                <div className="empty_download_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_DOWNLOAD_FRAME_NO_DOWNLOAD_PROJECT")}</h1>
                </div>
            </div>
        );
    }

    private renderProjects(): React.ReactNode[] {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const oProjectSource = this.getReceiveData();
        if (!Array.isArray(oProjectSource) || oProjectSource.length === 0) {
            return [];
        }

        const aProjectNodes: React.ReactNode[] = [];
        for (const project of oProjectSource) {
            aProjectNodes.push(this.renderProject(project));
        }

        return aProjectNodes;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private renderProject(oProject: any): React.ReactNode {
        const projectSource = this.createProjectSource(oProject);

        const oMagnet = new DownloadMagnet(projectSource);

        return oMagnet.render();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private createProjectSource(oProject: any): IDownloadMagnetItem {
        const oPlatforms: IDownloadMagnetBinaries = {};
        const binary = oProject["binary"];
        for (const binaryKey of Object.keys(binary)) {
            const binaryItem = binary[binaryKey];

            const itemName = decodeURI(binaryItem["name"] || binaryKey);

            const aBinaries: IDownloadBinarySource[] = [];
            const oBinariesSource = binaryItem["source"];
            for (const binarySource of oBinariesSource) {
                const url = binarySource.url;

                let link = "";
                switch (binarySource["address"]) {
                    case "inner":
                        link = `${AITIANYU_CN_STATIC_FILE_SERVER}/${url}`;
                        break;
                    case "web":
                    default:
                        link = url;
                        break;
                }

                aBinaries.push({
                    name: decodeURI(binarySource["name"] || ""),
                    url: link,
                });
            }
            oPlatforms[itemName] = aBinaries;
        }

        const oMagnetSource: IDownloadMagnetItem = {
            key: oProject["key"],
            name: decodeURI(oProject["name"]),
            desc: decodeURI(oProject["desc"]),
            github: oProject["github"],
            bin: oPlatforms,
        };

        return oMagnetSource;
    }
}
