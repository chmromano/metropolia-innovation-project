import { GraphQLError } from "graphql";

import { IDevice } from "../../../models/device";
import DeviceMeasurement from "../../../models/deviceMeasurement";
import { isNumber } from "../../../types/typeUtils";

interface Context {
  currentDevice: IDevice;
}

interface Args {
  temperature: number;
  tankLevel: number;
}

export const addDeviceMeasurement = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  const device = context.currentDevice;
  if (!device) {
    throw new GraphQLError("not authenticated", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  const temperature = args.temperature;
  if (!isNumber(temperature)) {
    throw new GraphQLError("invalid temperature", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.temperature,
      },
    });
  }

  const tankLevel = args.tankLevel;
  if (!isNumber(tankLevel)) {
    throw new GraphQLError("invalid tank level", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.tankLevel,
      },
    });
  }

  const deviceMeasurement = new DeviceMeasurement({
    temperature,
    tankLevel,
    timestamp: new Date(),
    metadata: device._id,
  });

  await deviceMeasurement.save();

  return {
    temperature: deviceMeasurement.temperature,
    tankLevel: deviceMeasurement.tankLevel,
    timestamp: deviceMeasurement.timestamp,
    metadata: { hardwareId: device._id },
  };
};
