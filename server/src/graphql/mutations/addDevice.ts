import {
  IDevicePopulated,
  createNewDevice,
  deleteDeviceAndRelatedData,
  findExistingDevice,
} from "./addDevice.helpers";
import { IDevice } from "../../models/device";
import { IUser } from "../../models/user";
import {
  validateHardwareId,
  validateSupportedPlants,
  validateUserAuthentication,
} from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

interface Args {
  hardwareId: unknown;
  supportedPlants: unknown;
}

export const addDevice = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  const user = validateUserAuthentication(context.currentUser);

  const hardwareId = validateHardwareId(args.hardwareId);
  const supportedPlants = validateSupportedPlants(args.supportedPlants);

  let device: IDevice | IDevicePopulated | null =
    await findExistingDevice(hardwareId);

  if (device && device.user.authUid !== user.authUid) {
    await deleteDeviceAndRelatedData(device);
  }

  if (!device || device.user.authUid !== user.authUid) {
    device = await createNewDevice(user, hardwareId, supportedPlants);
  }

  const graphQlResponse = {
    id: device._id,
    hardwareId,
    user: user._id,
    plants: device.plants,
    name: device.name,
  };

  return graphQlResponse;
};
