/**@format */

import { require_msgbundle } from "ts-core/I18n";
import { render } from "./ErrorBase";

const messageBundle = require_msgbundle("error", "app");

const errorCode: string = "400";

document.title = messageBundle.getText(`ERROR_PAGE_TITLE_${errorCode}`);

render(errorCode);
