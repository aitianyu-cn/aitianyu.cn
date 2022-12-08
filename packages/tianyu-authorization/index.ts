/**@format */

import { createServer, DatabasePools, HttpHandler } from "aitianyu-server-base";
import { IncomingMessage, ServerResponse } from "http";
import { LoginDispatcher } from "./src/dispatcher/LoginDispatcher";
import { LogonDispatcher } from "./src/dispatcher/LogonDispatcher";

const dbConfig = require("./src/config/mysql.config.json");

const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const loginDispatcher = new LoginDispatcher(databasePool);
loginDispatcher.createDispatches(handler);

const logonDispatcher = new LogonDispatcher(databasePool);
logonDispatcher.createDispatches(handler);

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
