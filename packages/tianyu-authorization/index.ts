/**@format */

import { createServer, DatabasePools, HttpHandler } from "@aitianyu.cn/server-base";
import { IncomingMessage, ServerResponse } from "http";
import { RegisterDispatcher } from "./src/dispatcher/RegisterDispatcher";
import { OnlineDispatcher } from "./src/dispatcher/OnlineDispatcher";

const dbConfig = require("./src/config/mysql.config.json");

const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const loginDispatcher = new RegisterDispatcher(databasePool);
loginDispatcher.createDispatches(handler);

const onlineDispatcher = new OnlineDispatcher(databasePool);
onlineDispatcher.createDispatches(handler);

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

server.listen(9010, "0.0.0.0");
