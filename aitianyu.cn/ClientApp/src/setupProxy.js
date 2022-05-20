const createProxyMiddleware = require("http-proxy-middleware");
const { env } = require("process");

// const target = env.ASPNETCORE_HTTPS_PORT
//   ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
//   : env.ASPNETCORE_URLS
//   ? env.ASPNETCORE_URLS.split(";")[0]
//   : "http://localhost:7996";

// console.log(target);

const context = ["/project_docs"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    // target: target,
    target: "http://192.168.0.38:5032",
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
