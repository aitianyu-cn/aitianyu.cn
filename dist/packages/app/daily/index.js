"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
const server_base_1 = require("@aitianyu.cn/server-base");
const CountDownDispatcher_1 = require("./src/dispatcher/CountDownDispatcher");
const TimerDispatcher_1 = require("./src/dispatcher/TimerDispatcher");
const UtilsDispatcher_1 = require("./src/dispatcher/UtilsDispatcher");
const dbConfig = require("./src/config/mysql.config.json");
const handler = new server_base_1.HttpHandler();
const databasePool = new server_base_1.DatabasePools(dbConfig);
const timerDispatcher = new TimerDispatcher_1.TimerDispatcher(databasePool);
const utilsDispatcher = new UtilsDispatcher_1.UtilsDispatcher(databasePool);
const countDown = new CountDownDispatcher_1.CountDownDispatcher(databasePool);
handler.registerDispatcher(timerDispatcher, utilsDispatcher, countDown);
const server = (0, server_base_1.createrServerByHandle)(handler);
server.listen(9300, "0.0.0.0");
