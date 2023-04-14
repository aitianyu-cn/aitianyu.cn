/**@format */

import React from "react";
import { renderLoading } from "tianyu-shell/ui/react/widget/GeneralWidget";
import { MapOfString } from "ts-core/Types";
import ReactMarkdown from "react-markdown";

import "tianyu-shell/ui/css/markdown/markdown.css";

export interface IReactMarkdownViewProperty {
    remote: string;
    emptyText: string;
    params: MapOfString;

    getData: () => string;
    loadData: (params: MapOfString) => Promise<void>;
}

export class ReactMarkdownView extends React.Component<IReactMarkdownViewProperty, IReactState> {
    private needRequest: boolean;

    public constructor(props: IReactMarkdownViewProperty) {
        super(props);

        this.needRequest = true;
    }

    public override componentDidMount(): void {
        if (this.needRequest) {
            this.needRequest = false;
            this.props.loadData(this.props.params).finally(() => {
                this.forceUpdate();
            });
        }
    }

    public override render(): React.ReactNode {
        if (!!this.props.getData()) {
            this.needRequest = false;
            return this.renderData();
        }

        if (!this.needRequest) {
            return this.renderNone();
        }

        return renderLoading();
    }

    private renderData(): React.ReactNode {
        const style: React.CSSProperties = {
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
            textAlign: "left",
            wordWrap: "break-word",
            wordBreak: "break-all",
            overflow: "scroll",
        };
        return (
            <div style={style}>
                <ReactMarkdown className="markdown-body">{this.props.getData()}</ReactMarkdown>
            </div>
        );
    }

    private renderNone(): React.ReactNode {
        return (
            <div>
                <h1>{this.props.emptyText}</h1>
            </div>
        );
    }
}
