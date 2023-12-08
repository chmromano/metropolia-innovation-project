import { GraphQLError } from "graphql";

import { IDevice } from "../../models/device";
import Plant, { IPlant } from "../../models/plant";
import { websocketConnections } from "../../websockets";

export const parseEditPlantArguments = (
  plantName: string | null,
  wateringLevel: number | null
) => {
  const updates: { name?: string; wateringLevel?: number } = {};

  if (plantName) {
    updates.name = plantName;
  }

  if (wateringLevel || wateringLevel === 0) {
    updates.wateringLevel = wateringLevel;
  }

  if (Object.keys(updates).length === 0) {
    throw new GraphQLError(
      "At least one valid field must be provided for updating",
      {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      }
    );
  }

  return updates;
};

export const updatePlant = async (id: string, updatedValues: object) => {
  const plant = await Plant.findByIdAndUpdate(id, updatedValues, {
    new: true,
  }).populate<{
    device: IDevice;
  }>("device");

  if (!plant) {
    throw new GraphQLError("Plant not found or unable to update", {
      extensions: {
        code: "NOT_FOUND",
        invalidArgs: id,
      },
    });
  }

  return plant;
};

interface IPlantPopulatedWithDevice extends Omit<IPlant, "device"> {
  device: IDevice;
}

export const notifyDeviceOfUpdates = (plant: IPlantPopulatedWithDevice) => {
  const webSocket = websocketConnections.get(plant.device.hardwareId);

  if (!webSocket) {
    throw new GraphQLError("Could not find device socket");
  }

  webSocket.send(
    `set_watering_t:val=${plant.wateringLevel}:index=${plant.plantIndex}`
  );
};
