/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IDocumentProperty } from "./DocumentFrame.model";

import "./css/main.css";
import { PageResizeController } from "tianyu-shell/common/controller/PageResize.controller";
import { Router } from "ts-core/Router";
import { APIFrame } from "./module/APIFrame";
import { BasicFrame } from "./module/BasicFrame";
import { ArchitectureFrame } from "./module/ArchitectureFrame";
import { HelpFrame } from "./module/HelpFrame";
import { MacrodefineFrame } from "./module/MacrodefineFrame";

const messageBundle = require_msgbundle("home", "app");

const HOME_PAGE_DOCUMENT_FRAME_ON_HASH_CHANGED = "HOME_PAGE_DOCUMENT_FRAME_ON_HASH_CHANGED";

type DocumentHashTarget = "none" | "api" | "architect" | "help" | "macro-def";

export class DocumentFrame extends React.Component<IDocumentProperty, IReactState> {
    private isLoaded: boolean;
    private hashTarget: DocumentHashTarget;

    public constructor(props: IDocumentProperty) {
        super(props);

        this.isLoaded = false;
        this.hashTarget = "none";

        document.title = messageBundle.getText("HOME_PAGE_DOCUMENT_TITLE");
        this.updateHashPosition();
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        tianyuShell.core.event.onhashChanged.listen(HOME_PAGE_DOCUMENT_FRAME_ON_HASH_CHANGED, this.onHashChanged.bind(this));
    }

    public override componentWillUnmount(): void {
        this.isLoaded = false;

        tianyuShell.core.event.onhashChanged.removeListen(HOME_PAGE_DOCUMENT_FRAME_ON_HASH_CHANGED);
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (this.isLoaded) {
            super.forceUpdate(callback);
        }
    }

    public override render(): React.ReactNode {
        return (
            <div className="pending_docs_outter">
                <div className="pending_docs_inner">{this.renderFrame()}</div>
            </div>
        );
    }

    private renderFrame(): React.ReactNode {
        switch (this.hashTarget) {
            case "api":
                return <APIFrame />;
            case "architect":
                return <ArchitectureFrame />;
            case "help":
                return <HelpFrame />;
            case "macro-def":
                return <MacrodefineFrame />;
            default:
                return <BasicFrame />;
        }
    }

    private onHashChanged(): void {
        const preHashTarget = this.hashTarget;
        this.updateHashPosition();

        if (preHashTarget !== this.hashTarget) {
            this.forceUpdate();
        }
    }

    private updateHashPosition(): void {
        let hashUrl = Router.getHash();
        if (hashUrl.startsWith("/")) hashUrl = hashUrl.substring(1);
        if (hashUrl.endsWith("/")) hashUrl = hashUrl.substring(0, hashUrl.length - 1);

        if (!hashUrl.startsWith("docs/")) {
            // if not start with docs
            // means:
            //      1. there is not a docs page, set the render to default
            //      2. there is a default docs page to render into home page
            this.hashTarget = "none";
            return;
        }

        hashUrl = hashUrl.substring(5, hashUrl.length);

        if (hashUrl === "api" || hashUrl.startsWith("api/")) this.hashTarget = "api";
        else if (hashUrl === "help" || hashUrl.startsWith("help/")) this.hashTarget = "help";
        else if (hashUrl === "arch" || hashUrl.startsWith("arch/")) this.hashTarget = "architect";
        else if (hashUrl === "macro" || hashUrl.startsWith("macro/")) this.hashTarget = "macro-def";
        else this.hashTarget = "none";
    }
}
