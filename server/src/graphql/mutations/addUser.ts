import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import User from "../../models/user";
import { MobileAppToken } from "../../types/types";
import { isString } from "../../types/typeUtils";
import config from "../../utils/config";

interface Args {
  userId: string;
}

export const addUser = async (_root: unknown, args: Args) => {
  if (!isString(args.userId)) {
    throw new GraphQLError("Invalid user id", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.userId,
      },
    });
  }

  let user = await User.findOne({
    authUid: args.userId,
  }).exec();

  if (user === null) {
    user = new User({
      authUid: args.userId,
      displayName: "Plantonaut",
    });

    try {
      await user.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(
          `There was an error saving the user: ${error.message}`
        );
      }
    }
  }

  const token: MobileAppToken = {
    type: "MobileAppToken",
    authUid: args.userId,
  };

  return { value: jwt.sign(token, config.MOBILE_APP_JWT_SECRET) };
};
