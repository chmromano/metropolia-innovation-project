import { GraphQLError } from "graphql";
import { Schema } from "mongoose";

import Plant from "../../models/plant";
import { IUser } from "../../models/user";
import { isNumber, isString } from "../../types/typeUtils";

interface Context {
  currentUser: IUser;
}

interface Args {
  name?: string;
  wateringLevel?: number;
  plant: Schema.Types.ObjectId;
}

const validateArgs = (
  args: Args
): {
  name?: string;
  wateringLevel?: number;
} => {
  const updates: { name?: string; wateringLevel?: number } = {};

  if (args.name) {
    if (!isString(args.name) || args.name.trim() === "") {
      throw new GraphQLError("Name must be a non-empty string.");
    }
    updates.name = args.name;
  }

  if (!isNumber(args.wateringLevel)) {
    throw new GraphQLError("Watering level must be a number.");
  }

  updates.wateringLevel = args.wateringLevel;

  if (Object.keys(updates).length === 0) {
    throw new Error("At least one valid field must be provided for updating.");
  }

  return updates;
};

export const editPlant = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  if (!context.currentUser) {
    throw new GraphQLError("Not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  let updatedValues;
  try {
    updatedValues = validateArgs(args);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args,
        },
      });
    }
  }

  const updatedPlant = await Plant.findByIdAndUpdate(
    args.plant,
    updatedValues,
    { new: true }
  );
  if (!updatedPlant) {
    throw new GraphQLError("Plant not found or unable to update", {
      extensions: {
        code: "NOT_FOUND",
        invalidArgs: args.plant,
      },
    });
  }

  return updatedPlant;
};
