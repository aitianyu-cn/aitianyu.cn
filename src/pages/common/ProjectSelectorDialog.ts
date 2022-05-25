/**@format */

import { IJsonHTML, IJsonHTMLButton } from "src/dty/IJsonHTML";

export const ProjectSelectorDialog: IJsonHTML = {
    view: {
        id: "project_selector_dialog_view",
        class: "project_selector_dialog_view",
        type: "div",
        children: [],
    },
};

export function insertButtonIntoProjectSelector(selector: IJsonHTML, content: string, trigger: string, event: string): void {
    const projectSelectorButton: IJsonHTMLButton = {
        id: `project_selector_dialog_view_selector_${selector.view.children.length}`,
        class: "project_selector_dialog_view_selector_button",
        content: content,
        clickTrigger: trigger,
        clickEvent: event,
    };

    selector.view.children.push(projectSelectorButton);
}
