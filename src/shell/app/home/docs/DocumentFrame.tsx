/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IDocumentProperty } from "./DocumentFrame.model";

import "./css/main.css";

const messageBundle = require_msgbundle("home", "app");

export class DocumentFrame extends React.Component<IDocumentProperty, IReactState> {
    public constructor(props: IDocumentProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_DOCUMENT_TITLE");
    }

    public override render(): React.ReactNode {
        return (
            <div className="pending_docs_outter">
                <div className="pending_docs_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_DOCUMENT_FRAME_PENDING")}</h1>
                </div>
            </div>
        );
    }
}
