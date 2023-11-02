import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import Device from "../../../models/device";
import DeviceMeasurement from "../../../models/deviceMeasurement";
import Plant from "../../../models/plant";
import PlantMeasurement from "../../../models/plantMeasurement";
import { IUser } from "../../../models/user";
import { EmbeddedDeviceToken } from "../../../types/types";
import { isNumber, isString } from "../../../types/typeUtils";
import config from "../../../utils/config";

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
  const user = context.currentUser;
  if (!user) {
    throw new GraphQLError("not authenticated", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  const hardwareId = args.hardwareId;
  const existingDevice = await Device.findOne({ hardwareId });
  if (existingDevice) {
    const deletionPromises = [
      DeviceMeasurement.deleteMany({ metadata: existingDevice._id }),
      PlantMeasurement.deleteMany({ metadata: existingDevice._id }),
      Plant.deleteMany({ _id: { $in: existingDevice.plants } }),
      Device.deleteOne({ hardwareId }),
    ];

    await Promise.all(deletionPromises);
  }

  const supportedPlants = args.supportedPlants;
  if (!isNumber(supportedPlants)) {
    throw new GraphQLError("invalid temperature", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.supportedPlants,
      },
    });
  }

  const newDevice = new Device({ user: user._id, hardwareId });
  await newDevice.save();

  const plantsToAdd = Array.from({ length: supportedPlants }, (_, index) => {
    return {
      device: newDevice._id,
      name: `Plant n. ${index}`,
      pump: index + 1,
    };
  });

  const insertedPlants = await Plant.insertMany(plantsToAdd);

  for (const plant of insertedPlants) {
    newDevice.plants.push(plant._id);
  }
  await newDevice.save();

  const token: EmbeddedDeviceToken = {
    type: "EmbeddedDeviceToken",
    firebaseUid: user.firebaseUid,
    hardwareId,
  };

  if (!isString(config.EMBEDDED_DEVICE_JWT_SECRET)) {
    throw new GraphQLError("something went very wrong", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }

  return { value: jwt.sign(token, config.EMBEDDED_DEVICE_JWT_SECRET) };
};
