const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const plantsRouter = require("./controllers/plants");
const middleware = require("./utils/middleware");
const morgan = require("morgan");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body"
  )
);
morgan.token("request-body", (request) => JSON.stringify(request.body));

app.use("/api/plants", plantsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
