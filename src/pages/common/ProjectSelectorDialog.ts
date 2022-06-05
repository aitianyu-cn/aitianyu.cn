/**@format */

import { IJsonHTML, IJsonHTMLButton } from "src/dty/IJsonHTML";

import "./css/project.selector.dialog.css";

export function generateProjectSelectorDialog(): IJsonHTML {
    return {
        view: {
            id: "project_selector_dialog_view",
            class: "project_selector_dialog_view",
            type: "div",
            children: [],
        },
    };
}

export function insertContentIntoProjectSelector(selector: IJsonHTML, content: string): void {
    const projectSelectorButton: IJsonHTMLButton = {
        id: "project_selector_dialog_view_selector_title",
        type: "div",
        class: "project_selector_dialog_view_selector_title",
        content: content,
    };

    selector.view.children.push(projectSelectorButton);
}

export function insertButtonIntoProjectSelector(selector: IJsonHTML, content: string, trigger: string, event: string): void {
    const projectSelectorButton: IJsonHTMLButton = {
        id: `project_selector_dialog_view_selector_${selector.view.children.length}`,
        type: "button",
        class: "project_selector_dialog_view_selector_button",
        content: content,
        clickTrigger: trigger,
        clickEvent: event,
    };

    selector.view.children.push(projectSelectorButton);
}
