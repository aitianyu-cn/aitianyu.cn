/**@format */

import { IncomingMessage, ServerResponse } from "http";
import { createServer, HttpHandler } from "@aitianyu.cn/server-base";

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

server.listen(9110, "0.0.0.0");
