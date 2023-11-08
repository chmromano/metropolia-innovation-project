import { NextFunction, Request, Response } from "express";

import logger from "./logger";

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
    return;
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
    return;
  } else if (error.name === "JsonWebTokenError") {
    response.status(400).json({ error: error.message });
    return;
  }

  next(error);
};

export default {
  errorHandler,
  unknownEndpoint,
};
