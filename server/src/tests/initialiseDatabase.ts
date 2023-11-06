import Device from "../models/device";
import DeviceMeasurement from "../models/deviceMeasurement";
import Plant from "../models/plant";
import PlantMeasurement from "../models/plantMeasurement";
import User from "../models/user";

const emptyDatabase = async () => {
  await User.deleteMany();
  await Device.deleteMany();
  await Plant.deleteMany();
  await PlantMeasurement.deleteMany();
  await DeviceMeasurement.deleteMany();
};

const initialiseDatabase = async () => {
  await emptyDatabase();

  const newUserOne = new User({
    authUid: "test_auth_uid",
    displayName: "Luke Skywalker",
  });
  const newUserTwo = new User({
    authUid: "jjjs",
    displayName: "Darth Vader",
  });
  const newUserThree = new User({
    authUid: "s",
    displayName: "Sheev Palpatine",
  });
  await newUserOne.save();
  await newUserTwo.save();
  await newUserThree.save();

  const newDeviceOne = new Device({
    hardwareId: "test_hardware_id",
    user: newUserOne._id,
  });
  await newDeviceOne.save();
  newUserOne.devices.push(newDeviceOne._id);
  await newUserOne.save();

  const newPlantOne = new Plant({
    name: "Monstera",
    device: newDeviceOne._id,
    plantIndex: 1,
    user: newUserOne._id,
  });
  await newPlantOne.save();
};

export default initialiseDatabase;
