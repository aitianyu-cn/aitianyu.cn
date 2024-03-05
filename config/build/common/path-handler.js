/**@format */

const path = require("path");

/** Project Root Path */
const PROJECT_ROOT = path.resolve(process.cwd(), ".");
/** Project Webpack Path */
const WEBPACK_ROOT = path.join(PROJECT_ROOT, "config/build");

const PROJECT_OUTPUT = path.join(PROJECT_ROOT, "build");

/** 项目主页与主页直接跳转的页面的根目录入口 */
const TIANYU_PROJECT_ENTRY = path.join(PROJECT_ROOT, "ty-home");
/** 项目子应用程序根目录入口 */
const TIANYU_APPLICATION_ENTRY = path.join(PROJECT_ROOT, "ty-app");
/** 项目公共配置文件、公共组件根目录入口 */
const TIANYU_COMMON_ENTRY = path.join(PROJECT_ROOT, "ty-common");
const TIANYU_INFRA_ENTRY = path.join(PROJECT_ROOT, "ty-infra");

module.exports = {
    PROJECT_ROOT: PROJECT_ROOT,
    WEBPACK_ROOT: WEBPACK_ROOT,

    PROJECT_OUTPUT: PROJECT_OUTPUT,

    TIANYU_PROJECT_ENTRY: TIANYU_PROJECT_ENTRY,
    TIANYU_APPLICATION_ENTRY: TIANYU_APPLICATION_ENTRY,
    TIANYU_COMMON_ENTRY: TIANYU_COMMON_ENTRY,
    TIANYU_INFRA_ENTRY: TIANYU_INFRA_ENTRY,
};
