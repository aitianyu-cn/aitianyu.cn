/**@format */

import React from "react";
import { renderLoading } from "tianyu-shell/ui/react/widget/GeneralWidget";
import {
    getProjectAllDocumentFromCache,
    loadProjectAllDocument,
} from "tianyu-server/controller/project/ProjectDocument.controller";
import { IProjectDocument, IProjectDocumentOption } from "tianyu-server/model/Project.model";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";
import { DocumentMagnet } from "../widget/DocumentMagnet";
import { DocumentSimpleMagnet } from "../widget/DocumentSimpleMagnet";

import "../css/basic-frame.css";
import "../css/simple-magnet.css";

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
                    if (!!!value.type) {
                        return (
                            <DocumentMagnet
                                id={value.key}
                                options={value.options}
                                project={value.project}
                                desc={value.desc}
                                name={value.name}
                                github=""
                                optionEmptyText={emptyText}
                            />
                        );
                    } else {
                        const helpOption = value.options.find((item: IProjectDocumentOption) => {
                            return item.target.toLowerCase() === "help" ? item : undefined;
                        });
                        return (
                            <DocumentSimpleMagnet
                                id={value.key}
                                project={value.project}
                                desc={value.desc}
                                name={value.name}
                                type={value.type}
                                hasHelp={!!helpOption}
                                helpText={helpOption?.name || ""}
                            />
                        );
                    }
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
