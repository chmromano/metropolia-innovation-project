import { gql } from "./codegen";

export const GET_DEVICES_WITH_LAST_MEASUREMENTS = gql(/* GraphQL */ `
  query getDevicesWithLastMeasurement {
    getDevicesWithLastMeasurement {
      device {
        id
        name
        hardwareId
      }
      lastMeasurement {
        temperature
        tankLevel
      }
    }
  }
`);

export const GET_PLANTS_WITH_LAST_MEASUREMENTS = gql(/* GraphQL */ `
  query getPlantsWithLastMeasurement {
    getPlantsWithLastMeasurement {
      plant {
        id
        name
        plantIndex
        wateringLevel
        device {
          hardwareId
        }
      }
      lastMeasurement {
        soilMoisture
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
