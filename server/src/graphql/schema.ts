const typeDefs = /* GraphQL */ `
  type Device {
    id: ID!
    hardwareId: String!
    user: User!
    plants: [Plants!]!
  }

  type Plant {
    id: ID!
    name: String!
    device: Device!
  }

  type plantMeasurement {
    humidity: Number!
    timestamp: String!
    metadata: Plant!
  }

  type tankMeasurement {
    tankLevel: Number!
    timestamp: String!
    metadata: Device!
  }

  type temperatureMeasurement {
    temperature: Number!
    timestamp: String!
    metadata: Device!
  }

  type User {
    id: ID!
    name: String!
    devices: [Devices!]!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    addTemperatureMeasurement(temperature: string!): TemperatureMeasurement
  }

  type Subscription {
  }
`;

export default typeDefs;
