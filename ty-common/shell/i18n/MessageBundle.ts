/**@format */

import { getTextFromFile } from "../infra/message/Message";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("infra", "i18n/message", id, args);
}
