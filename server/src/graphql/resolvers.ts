import { addDevice } from "./mutations/addDevice";
import { addDeviceMeasurement } from "./mutations/addDeviceMeasurement";
import { addPlantMeasurement } from "./mutations/addPlantMeasurement";
import { getDevices } from "./queries/getDevices";
import { getPlants } from "./queries/getPlants";

const resolvers = {
  Query: {
    getDevices: getDevices,
    getPlants: getPlants,
  },

  Mutation: {
    addDevice: addDevice,
    addDeviceMeasurement: addDeviceMeasurement,
    addPlantMeasurement: addPlantMeasurement,
  },
};

export default resolvers;
