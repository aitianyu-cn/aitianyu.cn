/**@format */

import React from "react";
import ReactMarkdown from "react-markdown";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "src/pages/common/TYDynamicPage";

import "./docs.comp.help.view.css";
import "github-markdown-css/github-markdown.css";

export class HelpMarkdownView extends TYDynamicPage {
    private sMarkdown: string;

    public constructor(props: IShellProperty) {
        super(props);

        this.sMarkdown = "";
    }

    protected renderLoaded(): React.ReactNode {
        return (
            <div className="docs_comp_help_view_base">
                <ReactMarkdown className="markdown-body">{this.sMarkdown}</ReactMarkdown>
            </div>
        );
    }

    protected override loadDataSuccess(): void {
        this.sMarkdown = (this.getReceiveData() as string) || "";

        if (!this.sMarkdown) {
            throw Error();
        }
    }
}
