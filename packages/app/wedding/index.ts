/**@format */

import { createrServerByHandle, DatabasePools, HttpHandler } from "@aitianyu.cn/server-base";
import { UserDispatcher } from "./dispatcher/UserDispatcher";

const dbConfig = require("./src/config/mysql.config.json");

const handler = new HttpHandler();
const databasePool = new DatabasePools(dbConfig);

const userDispatcher = new UserDispatcher(databasePool);

handler.addDispatcher(userDispatcher);

const server = createrServerByHandle(handler);
server.listen(9400, "0.0.0.0");
