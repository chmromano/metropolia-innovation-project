import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express, { json } from "express";
import { graphql } from "graphql";
import depthLimit from "graphql-depth-limit";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";

import {
  getGqlDataFromOperation,
  parseOperation,
  webSocketRawDataToString,
} from "./deviceOperations";
import { createNewUser } from "./graphql/mutations/addUser.helpers";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";
import Device from "./models/device";
import User from "./models/user";
import {
  parseCustomSocket,
  parseString,
  toCustomSocket,
} from "./types/typeUtils";
import authUtils from "./utils/authUtils";
import config from "./utils/config";
import logger from "./utils/logger";
import middleware from "./utils/middleware";
import {
  addWebSocketConnection,
  removeWebSocketConnection,
} from "./websockets";

mongoose.set("strictQuery", false);
if (config.NODE_ENV === "development" || config.NODE_ENV === "test") {
  mongoose.set("debug", true);
}

logger.info("connecting to", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).catch((error) => {
  logger.error("error connection to MongoDB:", error.message);
});

const start = async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({ noServer: true });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [depthLimit(3)],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = authUtils.getAuthTokenFromHeader(req.headers);

        try {
          if (token !== null) {
            const decodedToken = authUtils.decodeMobileAppToken(token);

            if (decodedToken.type === "MobileAppToken") {
              const currentUser =
                (await User.findOne({
                  authUid: decodedToken.authUid,
                }).exec()) || (await createNewUser(decodedToken.authUid));

              return { currentUser };
            }
          }
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

  httpServer.on("upgrade", (request, socket, head) => {
    const url = new URL(
      parseString(request.url),
      `http://${request.headers.host}`
    );

    const token = url.searchParams.get("token");

    if (token === null) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    void (async () => {
      try {
        const decodedToken = authUtils.decodeHardwareToken(token);

        if (decodedToken.type !== "EmbeddedDeviceToken") {
          throw new Error("Invalid token type");
        }

        const currentUser = await User.findOne({
          authUid: decodedToken.authUid,
        }).exec();

        const currentDevice = await Device.findOne({
          hardwareId: decodedToken.hardwareId,
        }).exec();

        if (currentUser === null || currentDevice === null) {
          throw new Error(
            "Could not find user and device associated to this token"
          );
        }

        wsServer.handleUpgrade(request, socket, head, (websocket) => {
          const customSocket = toCustomSocket(
            websocket,
            currentUser,
            currentDevice
          );

          wsServer.emit("connection", customSocket, request);

          addWebSocketConnection(currentDevice.hardwareId, websocket);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        }
        socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
        socket.destroy();
      }
    })();
  });

  wsServer.on("connection", (socket) => {
    const customSocket = parseCustomSocket(socket);

    customSocket.on("message", (message) => {
      void (async () => {
        try {
          const parsedMessage = webSocketRawDataToString(message);
          const operation = parseOperation(JSON.parse(parsedMessage));
          const gqlData = getGqlDataFromOperation(operation);

          await graphql({
            schema,
            contextValue: {
              currentDevice: customSocket.currentDevice,
              currentUser: customSocket.currentUser,
            },
            source: gqlData.query,
            variableValues: gqlData.variables,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(`error: ${error.message}`);
            customSocket.send(`error: ${error.message}`);
          }
        }
      })();
    });

    customSocket.on("close", () => {
      removeWebSocketConnection(customSocket.currentDevice.hardwareId);
    });
  });

  httpServer.listen(config.PORT, config.HOST, () =>
    logger.info(`Server is now running on http://${config.HOST}:${config.PORT}`)
  );
};

start().catch((error) => {
  logger.error("error starting the server:", error.message);
});
