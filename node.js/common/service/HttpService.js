/**@format */

const http = require("http");
const { ERROR_CODE } = require("../common/Errors");

/**
 *
 * @param {((req: http.IncomingMessage, res: http.ServerResponse) => void)} get
 * @param {((req: http.IncomingMessage, res: http.ServerResponse) => void)} post
 * @param {((any) => void)} error
 * @returns {http.Server}
 */
function createServer(get, post, error) {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        switch (req.method) {
            case "GET":
                get(req, res);
                break;
            case "POST":
                post(req, res);
                break;
            default:
                res.end({
                    result: "failed",
                    message: [{ code: ERROR_CODE.NOT_SUPPORT_OPERATION, text: `Not support operation: ${req.method}` }],
                    response: null,
                });
                break;
        }
    });

    server.on("error", error);

    return server;
}

module.exports.createServer = createServer;
