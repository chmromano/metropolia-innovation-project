import PlantMeasurement from "../../models/plantMeasurement";
import { IUser } from "../../models/user";
import {
  validatePlantId,
  validateUserAuthentication,
} from "../utils/validationUtils";

interface Args {
  plantId: unknown;
}

interface Context {
  currentUser: IUser;
}

export const getPlantMeasurements = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  validateUserAuthentication(context.currentUser);

  const plantId = validatePlantId(args.plantId);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const plantMeasurements = await PlantMeasurement.find({
    metadata: plantId,
    timestamp: { $gte: sevenDaysAgo },
  });

  return plantMeasurements;
};
