/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Device = {
  __typename?: "Device";
  hardwareId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  plants: Array<Plant>;
  user: User;
};

export type DeviceMeasurement = {
  __typename?: "DeviceMeasurement";
  metadata: Device;
  tankLevel: Scalars["Float"]["output"];
  temperature: Scalars["Float"]["output"];
  timestamp: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  addDevice?: Maybe<Device>;
  addDeviceMeasurement?: Maybe<DeviceMeasurement>;
  addPlantMeasurement?: Maybe<PlantMeasurement>;
  addUser?: Maybe<Token>;
  editPlant: Plant;
  generateHardwareToken?: Maybe<Token>;
  waterPlant: Scalars["Boolean"]["output"];
};

export type MutationAddDeviceArgs = {
  hardwareId: Scalars["String"]["input"];
  supportedPlants: Scalars["Int"]["input"];
};

export type MutationAddDeviceMeasurementArgs = {
  tankLevel: Scalars["Float"]["input"];
  temperature: Scalars["Float"]["input"];
};

export type MutationAddPlantMeasurementArgs = {
  plantIndex: Scalars["Int"]["input"];
  soilMoisture: Scalars["Float"]["input"];
};

export type MutationAddUserArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationEditPlantArgs = {
  plantId: Scalars["String"]["input"];
  plantName?: InputMaybe<Scalars["String"]["input"]>;
  wateringLevel?: InputMaybe<Scalars["Float"]["input"]>;
};

export type MutationGenerateHardwareTokenArgs = {
  hardwareId: Scalars["String"]["input"];
};

export type MutationWaterPlantArgs = {
  hardwareId: Scalars["String"]["input"];
  plantIndex: Scalars["Int"]["input"];
};

export type Plant = {
  __typename?: "Plant";
  device: Device;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  plantIndex: Scalars["Int"]["output"];
  user: User;
  wateringLevel: Scalars["Int"]["output"];
};

export type PlantMeasurement = {
  __typename?: "PlantMeasurement";
  metadata: Plant;
  soilMoisture: Scalars["Float"]["output"];
  timestamp: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getDeviceMeasurements: Array<DeviceMeasurement>;
  getDevices: Array<Device>;
  getPlantMeasurements: Array<PlantMeasurement>;
  getPlants: Array<Plant>;
};

export type QueryGetDeviceMeasurementsArgs = {
  deviceId: Scalars["String"]["input"];
};

export type QueryGetPlantMeasurementsArgs = {
  plantId: Scalars["String"]["input"];
};

export type Token = {
  __typename?: "Token";
  value: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  authUid: Scalars["String"]["output"];
  devices: Array<Device>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type AddDeviceMutationVariables = Exact<{
  hardwareId: Scalars["String"]["input"];
  supportedPlants: Scalars["Int"]["input"];
}>;

export type AddDeviceMutation = {
  __typename?: "Mutation";
  addDevice?: { __typename?: "Device"; id: string } | null;
};

export type GenerateHardwareTokenMutationVariables = Exact<{
  hardwareId: Scalars["String"]["input"];
}>;

export type GenerateHardwareTokenMutation = {
  __typename?: "Mutation";
  generateHardwareToken?: { __typename?: "Token"; value: string } | null;
};

export type AddUserMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type AddUserMutation = {
  __typename?: "Mutation";
  addUser?: { __typename?: "Token"; value: string } | null;
};

export type WaterPlantMutationVariables = Exact<{
  hardwareId: Scalars["String"]["input"];
  plantIndex: Scalars["Int"]["input"];
}>;

export type WaterPlantMutation = {
  __typename?: "Mutation";
  waterPlant: boolean;
};

export type EditPlantMutationVariables = Exact<{
  plantId: Scalars["String"]["input"];
  plantName?: InputMaybe<Scalars["String"]["input"]>;
  wateringLevel?: InputMaybe<Scalars["Float"]["input"]>;
}>;

export type EditPlantMutation = {
  __typename?: "Mutation";
  editPlant: { __typename?: "Plant"; id: string };
};

export type GetDevicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetDevicesQuery = {
  __typename?: "Query";
  getDevices: Array<{ __typename?: "Device"; id: string; name: string }>;
};

export type GetPlantsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPlantsQuery = {
  __typename?: "Query";
  getPlants: Array<{
    __typename?: "Plant";
    id: string;
    name: string;
    plantIndex: number;
    device: { __typename?: "Device"; hardwareId: string };
  }>;
};

export type GetPlantMeasurementsQueryVariables = Exact<{
  plantId: Scalars["String"]["input"];
}>;

export type GetPlantMeasurementsQuery = {
  __typename?: "Query";
  getPlantMeasurements: Array<{
    __typename?: "PlantMeasurement";
    timestamp: string;
    soilMoisture: number;
  }>;
};

export type GetDeviceMeasurementsQueryVariables = Exact<{
  deviceId: Scalars["String"]["input"];
}>;

export type GetDeviceMeasurementsQuery = {
  __typename?: "Query";
  getDeviceMeasurements: Array<{
    __typename?: "DeviceMeasurement";
    timestamp: string;
    temperature: number;
    tankLevel: number;
  }>;
};

export const AddDeviceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addDevice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hardwareId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "supportedPlants" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addDevice" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "hardwareId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hardwareId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "supportedPlants" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "supportedPlants" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddDeviceMutation, AddDeviceMutationVariables>;
export const GenerateHardwareTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "generateHardwareToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hardwareId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "generateHardwareToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "hardwareId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hardwareId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "value" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GenerateHardwareTokenMutation,
  GenerateHardwareTokenMutationVariables
>;
export const AddUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "value" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const WaterPlantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "waterPlant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hardwareId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "plantIndex" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "waterPlant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "hardwareId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hardwareId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "plantIndex" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "plantIndex" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WaterPlantMutation, WaterPlantMutationVariables>;
export const EditPlantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "editPlant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "plantId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "plantName" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "wateringLevel" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "editPlant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "plantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "plantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "plantName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "plantName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "wateringLevel" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "wateringLevel" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditPlantMutation, EditPlantMutationVariables>;
export const GetDevicesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDevices" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDevices" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDevicesQuery, GetDevicesQueryVariables>;
export const GetPlantsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getPlants" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getPlants" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "plantIndex" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "device" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hardwareId" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlantsQuery, GetPlantsQueryVariables>;
export const GetPlantMeasurementsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getPlantMeasurements" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "plantId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getPlantMeasurements" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "plantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "plantId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "soilMoisture" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPlantMeasurementsQuery,
  GetPlantMeasurementsQueryVariables
>;
export const GetDeviceMeasurementsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDeviceMeasurements" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "deviceId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDeviceMeasurements" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "deviceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "deviceId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "temperature" } },
                { kind: "Field", name: { kind: "Name", value: "tankLevel" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDeviceMeasurementsQuery,
  GetDeviceMeasurementsQueryVariables
>;
