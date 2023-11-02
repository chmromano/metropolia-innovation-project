const typeDefs = /* GraphQL */ `
  type Device {
    id: ID!
    hardwareId: String!
    user: User!
    plants: [Plant!]!
  }

  type Plant {
    id: ID!
    name: String!
    device: Device!
    plantIndex: Int!
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
    firebaseUid: String!
    name: String!
    devices: [Device!]!
  }

  type Token {
    value: String!
  }

  type Query {
    allTemperatureMeasurements: String!
  }

  type Mutation {
    addDeviceMeasurement(
      temperature: Float!
      tankLevel: Float!
    ): DeviceMeasurement
    addDevice(hardwareId: String!, supportedPlants: Int!): Token
    addPlantMeasurement(hardwareId: String!, plantIndex: Int!): PlantMeasurement
    editPlant(plant: String!, name: String, wateringLevel: Int): Plant!
  }
`;

export default typeDefs;
