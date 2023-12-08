import DeviceMeasurement from "../../models/deviceMeasurement";
import { IUser } from "../../models/user";
import {
  validateDeviceId,
  validateUserAuthentication,
} from "../utils/validationUtils";

interface Args {
  deviceId: unknown;
}

interface Context {
  currentUser: IUser;
}

export const getDeviceMeasurements = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  validateUserAuthentication(context.currentUser);

  const deviceId = validateDeviceId(args.deviceId);

  const deviceMeasurements = await DeviceMeasurement.find({
    metadata: deviceId,
  });

  return deviceMeasurements;
};
