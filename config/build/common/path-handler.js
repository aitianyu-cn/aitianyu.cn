/**@format */

const path = require("path");

const PROJECT_ROOT = path.resolve(process.cwd(), ".");
const WEBPACK_ROOT = path.join(PROJECT_ROOT, "config/build");

const TIANYU_PROJECT_ENTRY = path.join(PROJECT_ROOT, "ty-home");
const TIANYU_APPLICATION_ENTRY = path.join(PROJECT_ROOT, "ty-app");
