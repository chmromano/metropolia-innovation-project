import { GraphQLError } from "graphql";

import { IDevice } from "../../models/device";
import Plant from "../../models/plant";
import PlantMeasurement from "../../models/plantMeasurement";
import {
  validateDeviceAuthentication,
  validatePlantIndex,
  validateSoilMoisture,
} from "../utils/validationUtils";

interface Context {
  currentDevice: IDevice;
}

interface Args {
  soilMoisture: unknown;
  plantIndex: unknown;
}

export const addPlantMeasurement = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  const device = validateDeviceAuthentication(context.currentDevice);

  const soilMoisture = validateSoilMoisture(args.soilMoisture);
  const plantIndex = validatePlantIndex(args.plantIndex);

  const plant = await Plant.findOne({
    device: device._id,
    plantIndex,
  });

  if (!plant) {
    throw new GraphQLError("Could not find selected plant");
  }

  const plantMeasurement = new PlantMeasurement({
    soilMoisture: soilMoisture,
    timestamp: new Date(),
    metadata: plant._id,
  });

  await plantMeasurement.save();

  return {
    soilMoisture: plantMeasurement.soilMoisture,
    timestamp: plantMeasurement.timestamp,
  };
};
