/**@format */

const { IncomingMessage, ServerResponse } = require("http");
const { URLSearchParams } = require("url");
const a = require("cookie-parser");
const { parseCookie, parseAcceptLanguage, defaultLanguage } = require("./HttpHelper");

/**
 *
 * @param {IncomingMessage} req
 * @param {{lang: string, query: any}} query
 */
function processLanguage(req, query) {
    try {
        const cookie = parseCookie(req.headers.cookie || "");
        query.lang = cookie["LANGUAGE"];
        if (!!!query.lang) {
            query.lang = parseAcceptLanguage(req.headers["accept-language"] || "");
        }
        if (!!!query.lang) {
            query.lang = defaultLanguage;
        }
    } catch {}
}

class HttpHandler {
    constructor() {
        this.router = {};
        this.fallback = null;
    }

    /**
     *
     * @param {string} url
     * @param {(query: any, messageList: string[]) => Promise<any>} router
     */
    setRouter(url, router) {
        this.router[url] = router;
    }

    /**
     *
     * @param {(query: any, messageList: string[]) => Promise<any>} fallback
     */
    setFallback(fallback) {
        this.fallback = fallback;
    }

    /**
     *
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     */
    getter(req, res) {
        const originUrl = req.url;
        const urlParam = originUrl.split("?");

        let query = { lang: "", query: null };
        const url = urlParam[0];
        if (urlParam.length > 1) {
            try {
                const querySearcher = new URLSearchParams(urlParam[1]);
                const newQuery = {};
                for (const [key, value] of querySearcher) newQuery[key] = value;
                query.query = newQuery;
            } catch {
                //
            }
        }
        processLanguage(req, query);

        this.dispatcher(url, query).then(
            (response) => {
                res.end(JSON.stringify(response));
            },
            (error) => {
                const errorResult = { result: "failed", message: [`${error}`], response: null };
                res.end(JSON.stringify(errorResult));
            },
        );
    }

    /**
     *
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     */
    poster(req, res) {
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            let query = null;
            try {
                query = JSON.parse(data);
            } catch {}

            const request = { lang: "", query: query };
            processLanguage(req, request);

            this.dispatcher(req.url || "", request).then(
                (response) => {
                    res.end(JSON.stringify(response));
                },
                (error) => {
                    const errorResult = { result: "failed", message: [`${error}`], response: null };
                    res.end(JSON.stringify(errorResult));
                },
            );
        });
    }

    /**
     *
     * @param {string} url
     * @param {{lang: string, query: any}} query
     *
     * @return {Promise<{result: string, message: string[], response: any}>}
     */
    dispatcher(url, query) {
        return new Promise(async (resolve) => {
            const result = { result: "success", message: [], response: null };

            console.log(query);
            try {
                if (typeof url !== "string" || !!!query) {
                    result.message.push("Invalid operation");
                    result.result = "failed";
                } else {
                    if (url.startsWith("/")) url = url.substring(1, url.length);

                    const router = this.router[url] || this.fallback;
                    if (router) {
                        result.response = await router(query, result.message);
                    } else {
                        result.message.push("Error 404: the required path could not find or access.");
                        result.result = "failed";
                    }
                }
            } catch (e) {
                result.message.push(`error: ${e.message}`);
                result.result = "failed";
            } finally {
                resolve(result);
            }
        });
    }
}

module.exports = HttpHandler;
