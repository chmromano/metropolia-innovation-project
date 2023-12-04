import { gql } from "./codegen";

export const ADD_DEVICE = gql(/* GraphQL */ `
  mutation addDevice($hardwareId: String!, $supportedPlants: Int!) {
    addDevice(hardwareId: $hardwareId, supportedPlants: $supportedPlants) {
      id
    }
  }
`);

export const GENERATE_HARDWARE_TOKEN = gql(/* GraphQL */ `
  mutation generateHardwareToken($hardwareId: String!) {
    generateHardwareToken(hardwareId: $hardwareId) {
      value
    }
  }
`);

export const ADD_USER = gql(/* GraphQL */ `
  mutation addUser($userId: String!) {
    addUser(userId: $userId) {
      value
    }
  }
`);

export const WATER_PLANT = gql(/* GraphQL */ `
  mutation waterPlant($hardwareId: String!, $plantIndex: Int!) {
    waterPlant(hardwareId: $hardwareId, plantIndex: $plantIndex)
  }
`);
