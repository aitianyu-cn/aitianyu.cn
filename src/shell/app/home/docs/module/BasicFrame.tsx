/**@format */

import React from "react";
import { renderLoading } from "./GeneralWidget";

import "../css/basic-frame.css";
import { CacheController } from "tianyu-app/home/DependencyLoader";
import { AITIANYU_CN_PROJECT_DOCS_SERVER } from "tianyu-server/Global";

const DOCUMENT_BASIC_DATA_SOURCE = `${AITIANYU_CN_PROJECT_DOCS_SERVER}/aitianyu/cn/project/list`;

export class BasicFrame extends React.Component<any, any> {
    private isLoaded: boolean;

    public constructor(props?: any) {
        super(props);

        this.isLoaded = false;
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        if (!!this.getData()) {
            return;
        }
    }

    public override render(): React.ReactNode {
        if (!!this.getData()) {
            return this.renderData();
        }

        return renderLoading();
    }

    private renderData(): React.ReactNode {
        return <div>Basic</div>;
    }

    private getData(): any {
        return CacheController.get(DOCUMENT_BASIC_DATA_SOURCE);
    }
}
