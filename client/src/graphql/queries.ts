import { gql } from "./codegen";

export const GET_DEVICES = gql(/* GraphQL */ `
  query getDevices {
    getDevices {
      id
      name
    }
  }
`);

export const GET_PLANTS = gql(/* GraphQL */ `
  query getPlants {
    getPlants {
      id
      name
      plantIndex
      device {
        hardwareId
      }
    }
  }
`);

export const GET_PLANT_MEASUREMENTS = gql(/* GraphQL */ `
  query getPlantMeasurements($plantId: String!) {
    getPlantMeasurements(plantId: $plantId) {
      timestamp
      soilMoisture
    }
  }
`);

export const GET_DEVICE_MEASUREMENTS = gql(/* GraphQL */ `
  query getDeviceMeasurements($deviceId: String!) {
    getDeviceMeasurements(deviceId: $deviceId) {
      timestamp
      temperature
      tankLevel
    }
  }
`);
