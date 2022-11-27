/**@format */

import React from "react";
import { renderLoading } from "./GeneralWidget";
import {
    getProjectAllDocumentFromCache,
    loadProjectAllDocument,
} from "tianyu-server/controller/project/ProjectDocument.controller";
import { IProjectDocument } from "tianyu-server/model/Project.model";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";
import { DocumentMagnet } from "../widget/DocumentMagnet";

import "../css/basic-frame.css";

export class BasicFrame extends React.Component<IReactProperty, IReactState> {
    private isLoaded: boolean;
    private loadingData: boolean;

    public constructor(props: IReactProperty) {
        super(props);

        this.isLoaded = false;
        this.loadingData = true;
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        if (!this.loadingData) {
            return;
        }

        loadProjectAllDocument().finally(() => {
            this.loadingData = false;
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
        if ((this.loadingData && !!this.getData()) || (!this.loadingData && !!this.getData())) {
            this.loadingData = false;
            return this.renderData();
        } else if (!this.loadingData && !!!this.getData()) {
            return this.renderEmpty();
        }

        return renderLoading();
    }

    private renderData(): React.ReactNode {
        const data = this.getData();
        if (!!!data) return this.renderEmpty();

        const messageBundle = require_msgbundle("home", "app");
        const emptyText = messageBundle.getText("HOME_PAGE_DOCUMENT_FRAME_PROJECT_NO_OPTIONS");
        return (
            <div className={isMobile ? "docs_selector_list_base_mob" : "docs_selector_list_base"}>
                {data.map((value: IProjectDocument) => {
                    return <DocumentMagnet {...value} github="" optionEmptyText={emptyText} />;
                })}
            </div>
        );
    }

    private renderEmpty(): React.ReactNode {
        const messageBundle = require_msgbundle("home", "app");
        return <div className="docs_selector_no_project">{messageBundle.getText("HOME_PAGE_DOCUMENT_FRAME_NO_PROJECT")}</div>;
    }

    private getData(): IProjectDocument[] | null {
        return getProjectAllDocumentFromCache();
    }
}
