require("dotenv").config();

const express = require("express");
const pinoHttp = require("pino-http");
const logger = require("./src/utils/logger");


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(pinoHttp({ logger }));

//static files
app.use(express.static("./public"))

//endpoints
const indexHandler = require("./src/handlers/indexHandler");
const signHandlers = require("./src/handlers/signHandlers");
const resultsHandler = require("./src/handlers/resultsHandler");

app.use("/", indexHandler)
app.use("/sign", signHandlers)
app.use("/results", resultsHandler)

app.listen(port, () => logger.info({port}, `Server running on http://localhost:${port}`));