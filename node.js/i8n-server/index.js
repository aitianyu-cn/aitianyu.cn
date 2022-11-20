/**@format */

const LevelDataBase = require("./src/service/LevelDatabase");
const { handler } = require("./src/handler/QueryHandler");
const { getter, poster } = require("./src/handler/HttpHandler");
const { createServer } = require("./src/service/HttpInterface");

const levelDB = new LevelDataBase("./i18n-db");
const queryHandler = handler(levelDB);
const httpGetter = getter(queryHandler);
const httpPoster = poster(queryHandler);

const server = createServer(httpGetter, httpPoster, (error) => {
    console.error(error);
});

console.log("server start");
server.listen(8000);
