/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IDocumentProperty } from "./DocumentFrame.model";

const messageBundle = require_msgbundle("home", "app");

export class DocumentFrame extends React.Component<IDocumentProperty, IReactState> {
    public constructor(props: IDocumentProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_DOCUMENT_TITLE");
    }

    public override render(): React.ReactNode {
        return <div>document</div>;
    }
}
