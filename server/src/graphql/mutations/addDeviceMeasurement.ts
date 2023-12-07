import { IDevice } from "../../models/device";
import DeviceMeasurement from "../../models/deviceMeasurement";
import {
  validateDeviceAuthentication,
  validateTankLevel,
  validateTemperature,
} from "../utils/validationUtils";

interface Context {
  currentDevice: IDevice;
}

interface Args {
  temperature: unknown;
  tankLevel: unknown;
}

export const addDeviceMeasurement = async (
  _root: unknown,
  args: Args,
  context: Context
) => {
  const device = validateDeviceAuthentication(context.currentDevice);

  const temperature = validateTemperature(args.temperature);
  const tankLevel = validateTankLevel(args.tankLevel);

  const deviceMeasurement = new DeviceMeasurement({
    temperature,
    tankLevel,
    timestamp: new Date(),
    metadata: device._id,
  });

  await deviceMeasurement.save();

  return {
    temperature: deviceMeasurement.temperature,
    tankLevel: deviceMeasurement.tankLevel,
    timestamp: deviceMeasurement.timestamp,
  };
};
