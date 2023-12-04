import { GraphQLError } from "graphql";

import { IUser } from "../../models/user";
import { isNumber, isString } from "../../types/typeUtils";
import { websocketConnections } from "../../websockets";

interface Context {
  currentUser: IUser;
}

interface Args {
  hardwareId: unknown;
  plantIndex: unknown;
}

export const waterPlant = (_root: unknown, args: Args, context: Context) => {
  try {
    if (!context.currentUser) {
      throw new GraphQLError("Not authenticated", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!isString(args.hardwareId)) {
      throw new GraphQLError("Invalid hardware ID", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.hardwareId,
        },
      });
    }

    if (!isNumber(args.plantIndex)) {
      throw new GraphQLError("Invalid plant index", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.plantIndex,
        },
      });
    }

    const webSocket = websocketConnections.get(args.hardwareId);
    if (!webSocket) {
      throw new GraphQLError("Could not find device socket");
    }

    webSocket.send(`activate_pump:index=${args.plantIndex}`);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
