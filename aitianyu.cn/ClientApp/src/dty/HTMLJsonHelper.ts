/**@format */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function validateJsonButton(item: any): boolean {
    return item["id"] && item["content"] && ((item["clickTrigger"] && item["clickEvent"]) || !item["clickTrigger"]);
}

export function validateJsonView(item: any): boolean {
    return item["id"] && item["class"];
}

export function validateJsonChild(item: any): boolean {
    return (
        item["id"] &&
        item["class"] &&
        item["type"] &&
        ((item["type"] === "button" &&
            (item["content"] || item["children"]) &&
            ((item["clickTrigger"] && item["clickEvent"]) || !item["clickTrigger"])) ||
            item["type"] !== "button")
    );
}
