/**@format */

const http = require("http");

function createServer(get, post, error) {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (req.method === "GET") {
            get(req, res);
        } else if (req.method === "POST") {
            post(req, res);
        } else {
            res.end();
        }
    });

    server.on("error", error);

    return server;
}

module.exports.createServer = createServer;
