/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IDownloadFrameProperty } from "./DownloadFrame.model";
import { DownloadMagnet } from "./DownloadMagnet";
import "./css/main.css";
import { ReactWaiting } from "tianyu-shell/ui/react/widget/control/ReactWaiting";
import { loadProjectAllDownloads } from "tianyu-server/controller/project/ProjectDocument.controller";
import { IProjectDownload } from "tianyu-server/model/Project.model";

const messageBundle = require_msgbundle("home", "app");

export class DownloadFrame extends React.Component<IDownloadFrameProperty, IReactState> {
    private isLoaded: boolean;
    private source?: IProjectDownload[];

    public constructor(props: IDownloadFrameProperty) {
        super(props);

        this.isLoaded = false;

        document.title = messageBundle.getText("HOME_PAGE_DOWNLOAD_TITLE");
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        if (!!this.source && this.isLoaded) {
            return;
        }

        loadProjectAllDownloads().then((values: IProjectDownload[]) => {
            this.source = values;
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
        if (!!!this.source) {
            return this.renderLoading();
        }

        return this.renderLoaded();
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
        const oProjectSource = this.source;
        if (!Array.isArray(oProjectSource) || oProjectSource.length === 0) {
            return [];
        }

        const emptyString = messageBundle.getText("HOME_PAGE_DOWNLOAD_FRAME_NO_DOWNLOAD_PROJECT");
        const aProjectNodes: React.ReactNode[] = [];
        for (const project of oProjectSource) {
            const oMagnet = new DownloadMagnet({ ...project, optionEmptyText: emptyString });
            aProjectNodes.push(oMagnet.render());
        }

        return aProjectNodes;
    }
}
