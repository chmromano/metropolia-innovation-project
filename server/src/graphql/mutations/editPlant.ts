import {
  notifyDeviceOfUpdates,
  parseEditPlantArguments,
  updatePlant,
} from "./editPlant.helpers";
import { IUser } from "../../models/user";
import {
  validatePlantId,
  validatePlantName,
  validateUserAuthentication,
  validateWateringLevel,
} from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

interface Args {
  plantName?: unknown;
  wateringLevel?: unknown;
  plantId: unknown;
}

export const editPlant = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  validateUserAuthentication(context.currentUser);

  const plantId = validatePlantId(args.plantId);
  const plantName = args.plantName ? validatePlantName(args.plantName) : null;
  const wateringLevel = args.wateringLevel
    ? validateWateringLevel(args.wateringLevel)
    : null;

  const updatedValues = parseEditPlantArguments(plantName, wateringLevel);
  const updatedPlant = await updatePlant(plantId, updatedValues);

  notifyDeviceOfUpdates(updatedPlant);

  const graphQlResponse = {
    id: updatedPlant._id,
    name: updatedPlant.name,
    device: updatedPlant.device._id,
    plantIndex: updatedPlant.plantIndex,
    user: updatedPlant.user,
    wateringLevel: updatedPlant.wateringLevel,
  };

  return graphQlResponse;
};
