import Device from "../../models/device";
import DeviceMeasurement from "../../models/deviceMeasurement";
import { IPlant } from "../../models/plant";
import { IUser } from "../../models/user";
import { validateUserAuthentication } from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

export const getDevicesWithLastMeasurement = async (
  _root: unknown,
  _args: unknown,
  context: Context
) => {
  const user = validateUserAuthentication(context.currentUser);

  const devices = await Device.find({ user: user._id }).populate<{
    plants: IPlant[];
  }>("plants");

  const devicesWithLastMeasurement = await Promise.all(
    devices.map(async (device) => {
      const lastMeasurement = await DeviceMeasurement.findOne({
        metadata: device._id,
      })
        .sort({ timestamp: -1 })
        .limit(1);

      return {
        device: {
          name: device.name,
          id: device._id,
          hardwareId: device.hardwareId,
          plants: device.plants,
        },
        lastMeasurement,
      };
    })
  );

  return devicesWithLastMeasurement;
};
