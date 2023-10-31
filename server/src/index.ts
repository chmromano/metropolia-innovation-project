import "express-async-errors";
import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express, { Request, json } from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import morgan from "morgan";
import { WebSocketServer } from "ws";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";
import User from "./models/user";
import initialiseDatabase from "./tests/initialiseDatabase";
import config from "./utils/config";
import logger from "./utils/logger";
import middleware from "./utils/middleware";

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

if (typeof config.MONGODB_URI === "string") {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      initialiseDatabase().catch((error) => {
        logger.error("error initializing the database:", error.message);
      });
    })
    .catch((error) => {
      logger.error("error connection to MongoDB:", error.message);
    });
} else {
  logger.error("MONGODB_URI is not defined in the environment variables");
}

mongoose.set("debug", true);

const start = async () => {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(morgan(config.MORGAN));
  morgan.token("request-body", (request: Request) =>
    JSON.stringify(request.body)
  );

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        /* eslint-disable-next-line @typescript-eslint/require-await */
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (
          auth &&
          auth.startsWith("Bearer ") &&
          typeof config.JWT_SECRET === "string"
        ) {
          const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);

          if (typeof decodedToken !== "string" && decodedToken.id) {
            const currentUser = await User.findById(decodedToken.id);

            return { currentUser };
          }
        }

        return {};
      },
    })
  );
  app.use(middleware.unknownEndpoint);
  app.use(middleware.errorHandler);

  httpServer.listen(config.PORT, () =>
    logger.info(`Server is now running on http://localhost:${config.PORT}`)
  );
};

start().catch((error) => {
  logger.error("error starting the server:", error.message);
});
