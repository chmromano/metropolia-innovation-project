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

  const supportedPlants = args.supportedPlants;
  if (!isNumber(supportedPlants) || supportedPlants < 1) {
    throw new GraphQLError("invalid number of supported plants", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.supportedPlants,
      },
    });
  }

  const hardwareId = args.hardwareId;
  if (!isString(hardwareId)) {
    throw new GraphQLError("invalid hardware id", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.hardwareId,
      },
    });
  }

  const existingDevice = await Device.findOne({ hardwareId }).populate<{
    user: IUser;
  }>("user");
  if (existingDevice && existingDevice.user.firebaseUid !== user.firebaseUid) {
    const deletionPromises = [
      DeviceMeasurement.deleteMany({ metadata: existingDevice._id }),
      PlantMeasurement.deleteMany({ metadata: existingDevice._id }),
      Plant.deleteMany({ _id: { $in: existingDevice.plants } }),
      Device.deleteOne({ hardwareId }),
    ];

    await Promise.all(deletionPromises);
  }

  const newDevice = new Device({ user: user._id, hardwareId });
  await newDevice.save();

  const plantsToAdd = Array.from({ length: supportedPlants }, (_, index) => {
    return {
      device: newDevice._id,
      name: "",
      plantIndex: index + 1,
      wateringLevel: 0,
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

  return { value: jwt.sign(token, config.EMBEDDED_DEVICE_JWT_SECRET) };
};
