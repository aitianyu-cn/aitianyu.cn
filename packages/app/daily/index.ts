/**@format */

import { DatabasePools, HttpHandler, createrServerByHandle } from "@aitianyu.cn/server-base";
import { CountDownDispatcher } from "./src/dispatcher/CountDownDispatcher";
import { TimerDispatcher } from "./src/dispatcher/TimerDispatcher";
import { UtilsDispatcher } from "./src/dispatcher/UtilsDispatcher";

const dbConfig = require("./src/config/mysql.config.json");

const handler = new HttpHandler();
const databasePool = new DatabasePools(dbConfig);

const timerDispatcher = new TimerDispatcher(databasePool);
const utilsDispatcher = new UtilsDispatcher(databasePool);
const countDown = new CountDownDispatcher(databasePool);

handler.registerDispatcher(timerDispatcher, utilsDispatcher, countDown);

const server = createrServerByHandle(handler);
server.listen(9300, "0.0.0.0");
