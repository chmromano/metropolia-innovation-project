import { IDevice } from "../../models/device";
import Plant from "../../models/plant";
import { IUser } from "../../models/user";
import { validateUserAuthentication } from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

export const getPlants = async (
  _root: unknown,
  _args: unknown,
  context: Context
) => {
  const user = validateUserAuthentication(context.currentUser);

  const plants = await Plant.find({ user: user._id }).populate<{
    device: IDevice;
  }>("device");

  return plants;
};
