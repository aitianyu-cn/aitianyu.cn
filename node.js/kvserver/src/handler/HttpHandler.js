/**@format */

const querystring = require("querystring");

function _getter(handler) {
    const opHandler = handler;

    function _getterInner(req, res) {
        const url = req.url;

        const urlParam = url.split("?");
        if (urlParam.length > 1) {
            const query = querystring.parse(urlParam[1]);
            const queryData = {
                type: query["type"],
                values: [
                    {
                        key: query["key"],
                        value: query["value"],
                    },
                ],
                keys: [query["key"]],
            };
            opHandler(queryData).then(
                (response) => {
                    res.end(JSON.stringify(response));
                },
                (error) => {
                    res.end(`{"result": "failed", error: ["${error}"]}`);
                },
            );
        } else {
            res.end(`{"result": "failed"}`);
        }
    }

    return _getterInner;
}

function _poster(handler) {
    const opHandler = handler;

    function _posterInner(req, res) {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const query = JSON.parse(data);

            opHandler(query).then(
                (response) => {
                    res.end(JSON.stringify(response));
                },
                (error) => {
                    res.end(`{"result": "failed", error: ["${error}"]}`);
                },
            );
        });
    }

    return _posterInner;
}

module.exports.getter = _getter;
module.exports.poster = _poster;
