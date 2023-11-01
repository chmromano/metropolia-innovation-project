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
  }

  type PlantMeasurement {
    humidity: Float!
    timestamp: String!
    metadata: Plant!
  }

  type TankMeasurement {
    tankLevel: Float!
    timestamp: String!
    metadata: Device!
  }

  type TemperatureMeasurement {
    temperature: Float!
    timestamp: String!
    metadata: Device!
  }

  type User {
    id: ID!
    name: String!
    devices: [Device!]!
  }

  # type Token {
  #   value: String!
  # }

  type Query {
    allTemperatureMeasurements: String!
  }

  type Mutation {
    addTemperatureMeasurement(temperature: Float!): TemperatureMeasurement
  }

  # type Subscription {
  # }
`;

export default typeDefs;
