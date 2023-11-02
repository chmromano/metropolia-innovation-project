import { addDevice } from "./mutations/addDevice";
import { addDeviceMeasurement } from "./mutations/addDeviceMeasurement";
import { addPlantMeasurement } from "./mutations/addPlantMeasurement";

const resolvers = {
  Query: {
    allTemperatureMeasurements: () => {
      return "HELLO";
    },
  },

  Mutation: {
    addDevice: addDevice,
    addDeviceMeasurement: addDeviceMeasurement,
    addPlantMeasurement: addPlantMeasurement,
  },
};

export default resolvers;
