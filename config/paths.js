const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  dotenv: resolveApp(".env"),
  appSrc: resolveApp("src"),
  appEntry: resolveApp("src/main.tsx"),
  appHtml: resolveApp("public/index.html"),
  appBuild: resolveApp("build"),
};
