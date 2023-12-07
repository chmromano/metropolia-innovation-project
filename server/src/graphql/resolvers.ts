import { addDevice } from "./mutations/addDevice";
import { addDeviceMeasurement } from "./mutations/addDeviceMeasurement";
import { addPlantMeasurement } from "./mutations/addPlantMeasurement";
import { addUser } from "./mutations/addUser";
import { editPlant } from "./mutations/editPlant";
import { generateHardwareToken } from "./mutations/generateHardwareToken";
import { waterPlant } from "./mutations/waterPlant";
import { getDeviceMeasurements } from "./queries/getDeviceMeasurements";
import { getDevices } from "./queries/getDevices";
import { getPlantMeasurements } from "./queries/getPlantMeasurements";
import { getPlants } from "./queries/getPlants";

const resolvers = {
  Query: {
    getDevices: getDevices,
    getPlants: getPlants,
    getDeviceMeasurements: getDeviceMeasurements,
    getPlantMeasurements: getPlantMeasurements,
  },

  Mutation: {
    addDevice: addDevice,
    addDeviceMeasurement: addDeviceMeasurement,
    addPlantMeasurement: addPlantMeasurement,
    addUser: addUser,
    editPlant: editPlant,
    generateHardwareToken: generateHardwareToken,
    waterPlant: waterPlant,
  },
};

export default resolvers;
