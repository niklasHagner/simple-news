const express = require("express");
const config = require("exp-config");
const errorHandler = require("./lib/init/errorHandler");
const middleware = require("./lib/init/middleware");
const routes = require("./lib/init/routes");
const views = require("./lib/init/views");
const app = express();

if (!config.APIKEY) {
  console.log("APIKEY config doesn't exist. Add it to your .env file");
  return;
}

process.env.TZ = "Europe/Stockholm";
app.enable("trust proxy");
app.disable("x-powered-by");

middleware(app);
routes(app);
views(app);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
