import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express, { json } from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";
import Device, { IDevice } from "./models/device";
import User from "./models/user";
import initialiseDatabase from "./tests/initialiseDatabase";
import authUtils from "./utils/authUtils";
import config from "./utils/config";
import logger from "./utils/logger";
import middleware from "./utils/middleware";

mongoose.set("strictQuery", false);
if (config.NODE_ENV === "development" || config.NODE_ENV === "test") {
  mongoose.set("debug", true);
}

logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => initialiseDatabase())
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

const start = async () => {
  const app = express();
  app.use(cors());
  app.use(json());

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
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        try {
          const token = authUtils.getAuthTokenFromHeader(req.headers);
          const clientType = authUtils.getClientTypeFromHeader(req.headers);
          const decodedToken = authUtils.decodeTokenBasedOnClientType(
            token,
            clientType
          );

          const currentUser = await User.findOne({
            firebaseUid: decodedToken.firebaseUid,
          }).exec();
          let currentDevice: IDevice | null = null;

          if (decodedToken.type === "EmbeddedDeviceToken") {
            currentDevice = await Device.findOne({
              hardwareId: decodedToken.hardwareId,
            }).exec();
          }

          return { currentUser, currentDevice };
        } catch (error: unknown) {
          let errorMessage = "Something went wrong.";
          if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
          }
          logger.error(errorMessage);
        }

        return {};
      },
    })
  );
  app.use(middleware.unknownEndpoint);
  app.use(middleware.errorHandler);

  httpServer.listen(config.PORT, config.HOST, () =>
    logger.info(`Server is now running on http://localhost:${config.PORT}`)
  );
};

start().catch((error) => {
  logger.error("error starting the server:", error.message);
});
