import { GraphQLError } from "graphql";

import Plant from "../../models/plant";
import { IUser } from "../../models/user";

interface Context {
  currentUser: IUser;
}

export const getPlants = async (
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

  const plants = await Plant.find({ user: context.currentUser._id });

  return plants;
};
