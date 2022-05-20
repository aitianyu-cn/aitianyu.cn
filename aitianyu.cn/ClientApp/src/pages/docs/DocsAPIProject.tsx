/**@format */

import { ReactNode } from "react";
import { LogState } from "src/dty/core/LogState";
import { ConsoleLog } from "src/dty/LogHelper";
import { IShellProperty } from "src/dty/model/IShell";
import { getLocationPathes } from "src/dty/RouterHelper";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { DataTypeProcessor } from "./utils/DataTypeProcessor";
import { NamespaceProcessor } from "./utils/NamespaceProcessor";
import { ProjectProcessor } from "./utils/ProjectProcessor";
import { renderDataTypeMembers } from "./view/DocsAPIDataType";
import { renderNamespace } from "./view/DocsAPINamespace";
import { renderNamespaceMembers } from "./view/DocsAPISpaceMember";

enum ContentDisplayType {
    Project,
    Namespace,
    DataType,
}

export class DocsAPIProject extends TYViewComponent {
    private data: any;
    private urlPath: string[];
    private projectKey: string;
    private namespaceKey: string;
    private contentDisplay: ContentDisplayType;

    private isLoaded: boolean;
    private errorWhileLoad: boolean;

    public constructor(props: IShellProperty) {
        super(props);

        this.isLoaded = false;
        this.errorWhileLoad = false;
        this.contentDisplay = ContentDisplayType.Project;

        this.urlPath = getLocationPathes();

        this.namespaceKey = "";
        this.projectKey = this.getTitle();
    }

    public componentDidMount(): void {
        this.loadData();
    }

    public render(): ReactNode {
        if (!this.isLoaded && !this.errorWhileLoad) {
            return <div className="docs_api_baseGrid">{this.renderLoading()}</div>;
        }

        if (this.errorWhileLoad) {
            return <div className="docs_api_baseGrid">{this.renderLoadError()}</div>;
        }

        return <div className="docs_api_baseGrid">{this.renderContent()}</div>;
    }

    private renderLoading(): React.ReactNode {
        return <div className="docs_api_title_base">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATA_LOADING")}</div>;
    }

    private renderLoadError(): React.ReactNode {
        return <div className="docs_api_title_base">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATA_LOAD_ERROR")}</div>;
    }

    private renderContent(): ReactNode {
        switch (this.contentDisplay) {
            case ContentDisplayType.Project:
                return this.renderProject();
            case ContentDisplayType.Namespace:
                return this.renderNamespace();
            case ContentDisplayType.DataType:
                return this.renderDataType();
        }
    }

    private renderProject(): ReactNode {
        const projectGlobal = ProjectProcessor(this.data);

        return renderNamespace(this.projectKey, projectGlobal, this.msgBundle);
    }

    private renderNamespace(): ReactNode {
        const datatypes = NamespaceProcessor(this.data, this.msgBundle);

        return renderNamespaceMembers(this.projectKey, this.namespaceKey, datatypes, this.msgBundle);
    }

    private renderDataType(): ReactNode {
        const dataType = DataTypeProcessor(this.data, this.msgBundle);

        return renderDataTypeMembers(
            this.projectKey,
            this.namespaceKey,
            this.urlPath[this.urlPath.length - 1],
            dataType,
            this.msgBundle,
        );
    }

    private getTitle(): string {
        const lastPathItem = this.urlPath[this.urlPath.length - 1];

        let titlePre = "";
        switch (this.urlPath.length) {
            case 3:
                titlePre = this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_PROJECT_TITLE");
                this.contentDisplay = ContentDisplayType.Project;
                break;
            case 4:
                titlePre = this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_NAMESPACE_TITLE");
                this.namespaceKey = lastPathItem;
                this.contentDisplay = ContentDisplayType.Namespace;
                break;
            case 5:
            default:
                titlePre = this.msgBundle.getI18n("TIANYU_DEV_DOCS_API_DATATYPE_TITLE");
                this.namespaceKey = this.urlPath[3];
                this.contentDisplay = ContentDisplayType.DataType;
                break;
        }

        const titleString = `${titlePre}${this.msgBundle.getI18n(lastPathItem)}`;
        document.title = titleString;

        return this.urlPath[2];
    }

    private async loadData(): Promise<void> {
        try {
            const aPath: string[] = [];
            for (let i = 2; i < this.urlPath.length; ++i) aPath.push(this.urlPath[i]);
            const response = await fetch(`project_docs/apibrowser/${aPath.join("/")}`);
            const data = await response.json();

            ConsoleLog(`DocsAPI: fetch data - ${data}`);
            if (data) {
                this.data = data;
                this.errorWhileLoad = false;
            } else {
                ConsoleLog(`DocsAPI: fetched data is Invalid - ${data}`, LogState.Warn);
                this.errorWhileLoad = true;
            }
        } catch {
            ConsoleLog(`DocsAPI: fetch data Failed`, LogState.Warn);
            this.errorWhileLoad = true;
        }
        this.isLoaded = true;

        this.forceUpdate();
    }
}
