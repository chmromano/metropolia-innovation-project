import { GraphQLError } from "graphql";

import Device from "../../../models/device";
import { IUser } from "../../../models/user";

interface Context {
  currentUser: IUser;
}

export const getDevices = async (
  _root: unknown,
  _args: unknown,
  context: Context
) => {
  if (!context.currentUser) {
    throw new GraphQLError("Not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  const devices = await Device.find({ user: context.currentUser._id });

  return devices;
};
