const typeDefs = /* GraphQL */ `
  type Device {
    id: ID!
    hardwareId: String!
    user: User!
    plants: [Plant!]!
    name: String!
  }

  type Plant {
    id: ID!
    name: String!
    device: Device!
    plantIndex: Int!
    user: User!
    wateringLevel: Int!
  }

  type PlantMeasurement {
    soilMoisture: Float!
    timestamp: String!
    metadata: Plant!
  }

  type DeviceMeasurement {
    temperature: Float!
    tankLevel: Float!
    timestamp: String!
    metadata: Device!
  }

  type User {
    id: ID!
    authUid: String!
    name: String!
    devices: [Device!]!
  }

  type Token {
    value: String!
  }

  type Query {
    getDevices: [Device!]!
    getPlants: [Plant!]!
    getPlantMeasurements(plantId: String!): [PlantMeasurement!]!
    getDeviceMeasurements(deviceId: String!): [DeviceMeasurement!]!
  }

  type Mutation {
    addDeviceMeasurement(
      temperature: Float!
      tankLevel: Float!
    ): DeviceMeasurement
    addDevice(hardwareId: String!, supportedPlants: Int!): Device
    generateHardwareToken(hardwareId: String!): Token
    addPlantMeasurement(
      soilMoisture: Float!
      plantIndex: Int!
    ): PlantMeasurement
    addUser(userId: String!): Token
    editPlant(plantId: String!, plantName: String, wateringLevel: Float): Plant!
    waterPlant(hardwareId: String!, plantIndex: Int!): Boolean!
  }
`;

export default typeDefs;
