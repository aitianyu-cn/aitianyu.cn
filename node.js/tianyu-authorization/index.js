/**@format */

const HttpHandler = require("../common/handler/HttpHandler");
const DatabasePools = require("../common/service/DatabasePools");
const LoginDispatcher = require("./src/dispatcher/LoginDispatcher");
const LogonDispatcher = require("./src/dispatcher/LogonDispatcher");
const { createServer } = require("../common/service/HttpService");

const dbConfig = require("./src/config/mysql.config.json");

const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const loginDispatcher = new LoginDispatcher(databasePool);
loginDispatcher.createDispatches(handler);

const logonDispatcher = new LogonDispatcher(databasePool);
logonDispatcher.createDispatches(handler);

const server = createServer(
    (req, res) => {
        handler.getter(req, res);
    },
    (req, res) => {
        handler.poster(req, res);
    },
    (error) => {
        console.error(error);
    },
);

server.listen(9010, "0.0.0.0");
