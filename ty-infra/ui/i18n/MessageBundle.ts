/**@format */

import { getTextFromFile } from "ty-infra/core/message/Message";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("infra", "ui/i18n/message", id, args);
}
