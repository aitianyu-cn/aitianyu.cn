/**@format */

import { createServer, HttpHandler } from "@aitianyu.cn/server-base";
import { IncomingMessage, ServerResponse } from "http";
import { ControlDispatcher } from "./src/dispatcher/ControlDispatcher";
import { GetterDispatcher } from "./src/dispatcher/GetterDispatcher";
import { SelectionDispatcher } from "./src/dispatcher/SelectionDispatcher";
import { UploaderDispatcher } from "./src/dispatcher/UploaderDispatcher";

const handler = new HttpHandler();

const controlDispatcher = new ControlDispatcher();
controlDispatcher.createDispatches(handler);

const getterDispatcher = new GetterDispatcher();
getterDispatcher.createDispatches(handler);

const selectionDispatcher = new SelectionDispatcher();
selectionDispatcher.createDispatches(handler);

const uploaderDispatcher = new UploaderDispatcher();
uploaderDispatcher.createDispatches(handler);

const server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        handler.getter(req, res);
    },
    (req: IncomingMessage, res: ServerResponse) => {
        handler.poster(req, res);
    },
    (error: Error) => {
        console.error(error);
    },
);

server.listen(9200, "0.0.0.0");
