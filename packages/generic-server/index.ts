/**@format */

import { createServer, DatabasePools, HttpHandler } from "@aitianyu.cn/server-base";
import { IncomingMessage, ServerResponse } from "http";
import { FeatureDispatcher } from "./src/dispatcher/FeatureDispatcher";
import { LanguageDispatcher } from "./src/dispatcher/LanguageDispatcher";

const dbConfig = require("./src/config/mysql.config.json");

const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const featureDispatcher = new FeatureDispatcher(databasePool);
featureDispatcher.createDispatches(handler);

const languageDispatcher = new LanguageDispatcher(databasePool);
languageDispatcher.createDispatches(handler);

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

server.listen(9000, "0.0.0.0");
