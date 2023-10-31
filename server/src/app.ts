import express, { Request } from "express";
import "express-async-errors";
// TODO: check if needed - import cors from "cors";
import middleware from "./utils/middleware";
import morgan from "morgan";
import config from "./utils/config";

const app = express();

// TODO: check if needed - app.use(cors());
// TODO: check if needed - needed app.use(express.static("build"));
app.use(express.json());
app.use(morgan(config.MORGAN));
morgan.token("request-body", (request: Request) =>
  JSON.stringify(request.body)
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
