/**@format */

import path from "path";
import { createServer, DatabasePools, FileService, HttpHandler, I18nReader } from "@aitianyu.cn/server-base";
import { IncomingMessage, ServerResponse } from "http";
import { DocumentDispatcher } from "./src/dispatcher/DocumentDispatcher";
import { FilesDispatcher } from "./src/dispatcher/FilesDispatcher";
import { ProjectDispatcher } from "./src/dispatcher/ProjectDispatcher";

const dbConfig = require("./src/config/mysql.config.json");
const basePath = path.resolve(__dirname, "resources");

const fServer = new FileService(basePath);
const i18nReader = new I18nReader(basePath);
const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const projectDispatches = new ProjectDispatcher(databasePool, i18nReader);
projectDispatches.createDispatches(handler);

const filesDispatcher = new FilesDispatcher(fServer);
filesDispatcher.createDispatches(handler);

const documentDispatcher = new DocumentDispatcher(basePath, i18nReader);
documentDispatcher.createDispatches(handler);

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

server.listen(9001, "0.0.0.0");
