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
    }
  }
`);
