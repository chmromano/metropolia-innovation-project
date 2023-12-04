import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import { IUser } from "../../models/user";
import { EmbeddedDeviceToken } from "../../types/types";
import { isString } from "../../types/typeUtils";
import config from "../../utils/config";

interface Context {
  currentUser: IUser;
}

interface Args {
  hardwareId: unknown;
}

export const generateHardwareToken = (
  _root: unknown,
  args: Args,
  context: Context
) => {
  if (!context.currentUser) {
    throw new GraphQLError("not authenticated", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  if (!isString(args.hardwareId)) {
    throw new GraphQLError("Invalid hardware id", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.hardwareId,
      },
    });
  }

  const token: EmbeddedDeviceToken = {
    type: "EmbeddedDeviceToken",
    authUid: context.currentUser.authUid,
    hardwareId: args.hardwareId,
  };

  return { value: jwt.sign(token, config.EMBEDDED_DEVICE_JWT_SECRET) };
};
