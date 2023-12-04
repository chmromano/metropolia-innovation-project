import { GraphQLError } from "graphql";

import { IDevice } from "../../models/device";
import Plant from "../../models/plant";
import PlantMeasurement from "../../models/plantMeasurement";
import { isNumber } from "../../types/typeUtils";

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
  if (!context.currentDevice) {
    throw new GraphQLError("not authenticated", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  if (!isNumber(args.soilMoisture)) {
    throw new GraphQLError("invalid soil moisture", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.soilMoisture,
      },
    });
  }

  if (!isNumber(args.plantIndex)) {
    throw new GraphQLError("invalid soil moisture", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.plantIndex,
      },
    });
  }

  const plant = await Plant.findOne({
    device: context.currentDevice._id,
    plantIndex: args.plantIndex,
  });
  if (!plant) {
    throw new GraphQLError("Could not find selected plant");
  }

  const plantMeasurement = new PlantMeasurement({
    soilMoisture: args.soilMoisture,
    timestamp: new Date(),
    metadata: plant._id,
  });

  await plantMeasurement.save();

  return {
    soilMoisture: plantMeasurement.soilMoisture,
    timestamp: plantMeasurement.timestamp,
    metadata: { id: plant._id },
  };
};
