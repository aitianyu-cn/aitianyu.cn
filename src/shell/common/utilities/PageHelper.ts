/**@format */

import { ErrorPage } from "../model/ErrorPageHelper.model";

export { ErrorPage };

export function jumpError(error: ErrorPage): void {
    const error2String = error.toString();

    window.location.href = `${window.location.origin}/global/error/${error2String}.html`;
}

export function pageRefresh(): void {
    window.location.reload();
}

export function go(path: string = ""): void {
    window.location.href = `${window.location.origin}${!!path ? "/" : ""}${path || ""}`;
}
