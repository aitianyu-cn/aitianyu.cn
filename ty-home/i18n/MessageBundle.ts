/**@format */

import { getTextFromFile } from "../../ty-common/shell/infra/message/Message";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("home", "i18n/message", id, args);
}
