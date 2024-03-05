/**@format */

import { getTextFromFile } from "ty-infra/core/message/Message";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("home", "i18n/message", id, args);
}
