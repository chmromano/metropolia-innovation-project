import Device from "../../models/device";
import { IPlant } from "../../models/plant";
import { IUser } from "../../models/user";
import { validateUserAuthentication } from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

export const getDevices = async (
  _root: unknown,
  _args: unknown,
  context: Context
) => {
  const user = validateUserAuthentication(context.currentUser);

  const devices = await Device.find({ user: user._id }).populate<{
    plants: IPlant[];
  }>("plants");

  return devices;
};
