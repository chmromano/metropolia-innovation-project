import Device, { IDevice } from "../../models/device";
import DeviceMeasurement from "../../models/deviceMeasurement";
import Plant from "../../models/plant";
import PlantMeasurement from "../../models/plantMeasurement";
import { IUser } from "../../models/user";

export const findExistingDevice = async (hardwareId: string) => {
  const existingDevice = await Device.findOne({
    hardwareId,
  }).populate<{
    user: IUser;
  }>("user");

  return existingDevice;
};

export interface IDevicePopulated extends Omit<IDevice, "user"> {
  user: IUser;
}

export const deleteDeviceAndRelatedData = async (device: IDevicePopulated) => {
  const deletionPromises = [
    DeviceMeasurement.deleteMany({ metadata: device._id }),
    PlantMeasurement.deleteMany({ metadata: device._id }),
    Plant.deleteMany({ _id: { $in: device.plants } }),
    Device.deleteOne({ _id: device._id }),
  ];

  await Promise.all(deletionPromises);
};

export const createNewDevice = async (
  user: IUser,
  hardwareId: string,
  supportedPlants: number
) => {
  const device = new Device({
    user: user._id,
    hardwareId,
    name: "Plantuino",
    plants: [],
  });

  const plantsToAdd = Array.from({ length: supportedPlants }, (_, index) => {
    return {
      device: device._id,
      name: "Plant",
      plantIndex: index,
      wateringLevel: 0,
      user: user._id,
    };
  });

  const insertedPlants = await Plant.insertMany(plantsToAdd);

  device.plants = insertedPlants.map((plant) => plant._id);

  await device.save();

  return device;
};
