import { GraphQLError } from "graphql";

import { IDevice } from "../../../models/device";
import PlantMeasurement from "../../../models/plantMeasurement";
import { isNumber } from "../../../types/typeUtils";

interface Context {
  currentDevice: IDevice;
}

interface Args {
  soilMoisture: number;
  plantIndex: number;
}

export const addPlantMeasurement = async (
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

  const soilMoisture = args.soilMoisture;
  if (!isNumber(soilMoisture)) {
    throw new GraphQLError("invalid soil moisture", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.soilMoisture,
      },
    });
  }

  const plantMeasurement = new PlantMeasurement({
    soilMoisture,
    timestamp: new Date(),
    metadata: device._id,
  });

  await plantMeasurement.save();

  return {
    soilMoisture: plantMeasurement.soilMoisture,
    timestamp: plantMeasurement.timestamp,
    metadata: { hardwareId: device._id },
  };
};
