/**@format */

const dailyPages = require("./pages/daily");
const imagePages = require("./pages/image");
const weddingPages = require("./pages/wedding");

module.exports = {
    ...dailyPages(),
    ...imagePages(),
    ...weddingPages(),
};
