/**@format */

import { ShellUIElement } from "./ShellUIElement";

export class RenderHelper {
    public static renderDOM(root: HTMLElement | string, element: ShellUIElement): void {
        const rootNode = typeof root === "string" ? document.getElementById(root) : root;
        if (rootNode) {
            rootNode.innerHTML = "";
            rootNode.appendChild(element.render());
        }
    }

    public static renderEmpty(root: HTMLElement | string): void {
        const rootNode = typeof root === "string" ? document.getElementById(root) : root;
        if (rootNode) {
            rootNode.innerHTML = "";
        }
    }
}
