/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { IInternalFrameProperty } from "./InternalFrame.model";

import "./css/main.css";

const messageBundle = require_msgbundle("home", "app");

export class InternalFrame extends React.Component<IInternalFrameProperty, IReactState> {
    public constructor(props: IInternalFrameProperty) {
        super(props);

        document.title = messageBundle.getText("HOME_PAGE_INTERNAL_TITLE");
    }

    public override render(): React.ReactNode {
        return (
            <div className="pending_internal_outter">
                <div className="pending_internal_inner">
                    <h1>{messageBundle.getText("HOME_PAGE_INTERNAL_FRAME_PENDING")}</h1>
                </div>
            </div>
        );
    }
}
