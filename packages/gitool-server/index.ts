/**@format */

import { createServer, DatabasePools, HttpHandler } from "@aitianyu.cn/server-base";
import { IncomingMessage, ServerResponse } from "http";
import { GitToolDispatcher } from "./src/dispatcher/GitToolDispatcher";
import { RunnerResultDispatcher } from "./src/dispatcher/RunnerResultDispatcher";

const dbConfig = require("./src/config/mysql.config.json");

const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const gitToolDispatcher = new GitToolDispatcher(databasePool);
gitToolDispatcher.createDispatches(handler);

const runnResultDispatcher = new RunnerResultDispatcher(databasePool);
runnResultDispatcher.createDispatches(handler);

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
