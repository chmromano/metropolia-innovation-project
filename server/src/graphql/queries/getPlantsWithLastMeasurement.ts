import { IDevice } from "../../models/device";
import Plant from "../../models/plant";
import PlantMeasurement from "../../models/plantMeasurement";
import { IUser } from "../../models/user";
import { validateUserAuthentication } from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

export const getPlantsWithLastMeasurement = async (
  _root: unknown,
  _args: unknown,
  context: Context
) => {
  const user = validateUserAuthentication(context.currentUser);

  const plants = await Plant.find({ user: user._id }).populate<{
    device: IDevice;
  }>("device");

  const plantsWithLastMeasurement = await Promise.all(
    plants.map(async (plant) => {
      const lastMeasurement = await PlantMeasurement.findOne({
        metadata: plant._id,
      })
        .sort({ timestamp: -1 })
        .limit(1);

      return {
        plant: {
          name: plant.name,
          id: plant._id,
          plantIndex: plant.plantIndex,
          wateringLevel: plant.wateringLevel,
          device: { hardwareId: plant.device.hardwareId },
        },
        lastMeasurement,
      };
    })
  );

  return plantsWithLastMeasurement;
};
