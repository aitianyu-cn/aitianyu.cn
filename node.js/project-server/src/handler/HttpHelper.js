/**@format */

/**
 * @param {string} cookie
 *
 * @return {{[key: string]: string}}
 */
function parseCookie(cookie) {
    const parsedCookie = {};

    const cookieItems = cookie.split(";");
    for (const item of cookieItems) {
        const processedItem = item.trim();
        const pair = processedItem.split("=");
        if (pair.length > 1) {
            parsedCookie[pair[0]] = pair[1];
        }
    }

    return parsedCookie;
}

/**
 * @param {string} acceptLang
 *
 * @return {string}
 */
function parseAcceptLanguage(acceptLang) {
    const langItems = acceptLang.split(";");
    const firstItem = langItems[0];
    if (firstItem) {
        const languagePair = firstItem.split(",");
        if (languagePair.length !== 0) {
            const language = languagePair[0];
            const formattedLanguage = language.replace("-", "_").trim();

            return formattedLanguage;
        }
    }

    return "";
}

const defaultLanguage = "zh_CN";

module.exports.defaultLanguage = defaultLanguage;
module.exports.parseCookie = parseCookie;
module.exports.parseAcceptLanguage = parseAcceptLanguage;
