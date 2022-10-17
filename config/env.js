const fs = require("fs");

const dotEnv = require("dotenv");

const paths = require("./paths");

const RUN_MODE = process.env.MODE || process.env.NODE_ENV;

const dotenvFiles = [`${paths.dotenv}.${RUN_MODE}.local`, `${paths.dotenv}.${RUN_MODE}`, paths.dotenv].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotEnv.config({
      path: dotenvFile,
    });
  }
});

const raw = Object.keys(process.env)
  .filter((key) => /^APP_/i.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      NODE_ENV: process.env.NODE_ENV || "development",
      PACKAGE_BUILD_TIME: new Date().toUTCString(),
    },
  );

const stringified = {
  "process.env": Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
};

module.exports = { raw, stringified };
