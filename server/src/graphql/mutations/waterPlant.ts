import { triggerWatering } from "./waterPlant.helpers";
import { IUser } from "../../models/user";
import {
  validateHardwareId,
  validatePlantIndex,
  validateUserAuthentication,
} from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

interface Args {
  hardwareId: unknown;
  plantIndex: unknown;
}

export const waterPlant = (_root: unknown, args: Args, context: Context) => {
  validateUserAuthentication(context.currentUser);

  const hardwareId = validateHardwareId(args.hardwareId);
  const plantIndex = validatePlantIndex(args.plantIndex);

  triggerWatering(hardwareId, plantIndex);

  return true;
};
