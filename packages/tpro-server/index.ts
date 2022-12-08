/**@format */

import { IncomingMessage, ServerResponse } from "http";
import { createServer, DatabasePools, FileService, HttpHandler, I18nReader } from "aitianyu-server-base";

const handler = new HttpHandler();

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

server.listen(9100, "0.0.0.0");
