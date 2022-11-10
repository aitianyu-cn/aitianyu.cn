/**@format */

import React from "react";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { FetchFileLoader } from "ts-core/FileLoader";
import { emptyMsgBundle, IMessageBundle, require_msgbundle } from "ts-core/I18n";
import { CallbackAction } from "ts-core/Types";
import {
    IDownloadBinarySource,
    IDownloadFrameProperty,
    IDownloadMagnetBinaries,
    IDownloadMagnetItem,
} from "./DownloadFrame.model";
import { DownloadMagnet } from "./DownloadMagnet";
import "./css/main.css";

const DOWNLOAD_BACKEND_DATA_I18N = "remote-connection/resources/i18n/international_zh_CN.json";
const DOWNLOAD_BACKEND_DATA_SOURCE = "remote-connection/project_download/downloadbrowser";

class CustomLanguageBundle implements IMessageBundle {
    private source: any;

    public constructor(source: any) {
        this.source = source;
    }

    public getText(key: string): string {
        return this.source?.[key] || key;
    }
}

export class DownloadFrame extends React.Component<IDownloadFrameProperty, IReactState> {
    private language: IMessageBundle;
    private isLoaded: boolean;

    private fnDataLoadResolve!: CallbackAction;
    private fnDataLoadReject!: CallbackAction;

    public constructor(props: IDownloadFrameProperty) {
        super(props);

        const cachedI18n = CacheController.get(DOWNLOAD_BACKEND_DATA_I18N);
        this.language = (cachedI18n && new CustomLanguageBundle(cachedI18n)) || emptyMsgBundle;
        this.isLoaded = false;

        if (!!cachedI18n && !!this.getReceiveData()) {
            const messageBundle = require_msgbundle("home", "app");
            WaitingDialog.withDialog(() => {
                return new Promise<void>((resolve, reject) => {
                    this.fnDataLoadResolve = resolve;
                    this.fnDataLoadReject = reject;
                });
            }, messageBundle.getText("HOME_PAGE_DOWNLOAD_FRAME_DATA_LOADING"));
        } else {
            this.fnDataLoadResolve = () => undefined;
            this.fnDataLoadReject = () => undefined;
        }
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        if (!!this.getReceiveData() && this.isLoaded) {
            this.fnDataLoadResolve();
            return;
        }

        const cachedI18n = CacheController.get(DOWNLOAD_BACKEND_DATA_I18N);

        const fileLoader = new FetchFileLoader(DOWNLOAD_BACKEND_DATA_SOURCE);
        const i18nLoader = new FetchFileLoader(DOWNLOAD_BACKEND_DATA_I18N);

        Promise.all([cachedI18n ? Promise.resolve() : fileLoader.openAsync(), i18nLoader.openAsync()]).then((value: any[]) => {
            const source = fileLoader.getResponse();
            const i18n = cachedI18n || i18nLoader.getResponse();

            this.language = new CustomLanguageBundle(i18n);
            if (!!!cachedI18n) {
                CacheController.cache(DOWNLOAD_BACKEND_DATA_I18N, i18n);
            }
            if (source) {
                CacheController.cache(DOWNLOAD_BACKEND_DATA_SOURCE, source);
            } else {
                this.fnDataLoadReject();
            }
            this.fnDataLoadResolve();

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
        return CacheController.get(DOWNLOAD_BACKEND_DATA_SOURCE);
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
        const messageBundle = require_msgbundle("home", "app");
        return (
            <div className="empty_download_outter">
                <div className="empty_download_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_DOWNLOAD_FRAME_DATA_LOADING")}</h1>
                </div>
            </div>
        );
    }

    private renderEmpty(): React.ReactNode {
        const messageBundle = require_msgbundle("home", "app");
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
        for (const platformSource of oProject["binary"]) {
            const platform: string = platformSource["system"];

            const aBinaries: IDownloadBinarySource[] = [];
            const oBinariesSource = platformSource["binary"];
            for (const binarySource of Object.keys(oBinariesSource)) {
                const url = oBinariesSource[binarySource];

                let link = "";
                switch (url["address"]) {
                    case "inner":
                        link = `${process.env.PUBLIC_URL}/download/${url["url"]}`;
                        break;
                    case "web":
                    default:
                        link = url["url"];
                        break;
                }

                aBinaries.push({
                    name: binarySource,
                    url: link,
                });
            }
            oPlatforms[this.language.getText(platform)] = aBinaries;
        }

        const oMagnetSource: IDownloadMagnetItem = {
            key: oProject["key"],
            name: this.language.getText(oProject["name"]),
            desc: this.language.getText(oProject["description"]),
            github: oProject["github"],
            bin: oPlatforms,
        };

        return oMagnetSource;
    }
}
