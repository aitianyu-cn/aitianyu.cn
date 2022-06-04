const createProxyMiddleware = require("http-proxy-middleware");
const { env } = require("process");

// const target = env.ASPNETCORE_HTTPS_PORT
//   ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
//   : env.ASPNETCORE_URLS
//   ? env.ASPNETCORE_URLS.split(";")[0]
//   : "http://localhost:7996";

// console.log(target);

const context = ["/global", "/project_docs", "/project_download", "/resources"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    // target: target,
    // target: "http://139.155.245.234:5000",
    target: "http://aitianyu.cn:5000",
    secure: false,
    changeOrigin: true,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
