import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import Device from "../../models/device";
import DeviceMeasurement from "../../models/deviceMeasurement";
import Plant from "../../models/plant";
import PlantMeasurement from "../../models/plantMeasurement";
import { IUser } from "../../models/user";
import { EmbeddedDeviceToken } from "../../types/types";
import { isNumber, isString } from "../../types/typeUtils";
import config from "../../utils/config";

interface Context {
  currentUser: IUser;
}

interface Args {
  hardwareId: string;
  supportedPlants: number;
}

export const addDevice = async (
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

  if (!isNumber(args.supportedPlants) || args.supportedPlants < 1) {
    throw new GraphQLError("invalid number of supported plants", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.supportedPlants,
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

  const existingDevice = await Device.findOne({
    hardwareId: args.hardwareId,
  }).populate<{
    user: IUser;
  }>("user");
  if (
    existingDevice &&
    existingDevice.user.authUid !== context.currentUser.authUid
  ) {
    const deletionPromises = [
      DeviceMeasurement.deleteMany({ metadata: existingDevice._id }),
      PlantMeasurement.deleteMany({ metadata: existingDevice._id }),
      Plant.deleteMany({ _id: { $in: existingDevice.plants } }),
      Device.deleteOne({ hardwareId: args.hardwareId }),
    ];

    await Promise.all(deletionPromises);
  }

  if (!existingDevice) {
    const newDevice = new Device({
      user: context.currentUser._id,
      hardwareId: args.hardwareId,
      name: "Plantuino",
    });
    await newDevice.save();

    const plantsToAdd = Array.from(
      { length: args.supportedPlants },
      (_, index) => {
        return {
          device: newDevice._id,
          name: "Plant",
          plantIndex: index + 1,
          wateringLevel: 0,
          user: context.currentUser._id,
        };
      }
    );

    const insertedPlants = await Plant.insertMany(plantsToAdd);

    for (const plant of insertedPlants) {
      newDevice.plants.push(plant._id);
    }
    await newDevice.save();
  }

  const token: EmbeddedDeviceToken = {
    type: "EmbeddedDeviceToken",
    authUid: context.currentUser.authUid,
    hardwareId: args.hardwareId,
  };

  return { value: jwt.sign(token, config.EMBEDDED_DEVICE_JWT_SECRET) };
};
